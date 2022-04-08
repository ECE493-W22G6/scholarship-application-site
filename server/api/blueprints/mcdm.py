from pydoc import doc
from flask import Blueprint, request, session
from flask_api import status

from api.database import get_scorecards, add_winners, db
from bson.objectid import ObjectId


class algorithm:
    def __init__(self, inp):
        self.ourCalculations = {}
        self._grades = []
        self.category = inp

    def grades(self):
        return self._grades

    def get_calculation(self, inputt, grade):
        if (inputt, grade) in self.ourCalculations.keys():
            a = self.ourCalculations[(inputt, grade)]
        else:
            a = 0
        return a

    def set_calculation(self, a, inputt, grade):
        self.ourCalculations[(inputt, grade)] = a
        if not grade in self._grades:
            self._grades.append(grade)

    def set_weight(self, weights, studentID):
        for inputt in self.category:
            calculated_score = sum(
                [
                    weights[grade] * self.get_calculation(inputt, grade)
                    for grade in weights.keys()
                ]
            )
            self.set_calculation(calculated_score, inputt, studentID)

    def setDictionary(self, calculation_array):
        for (inputt, grade) in calculation_array.keys():
            self.set_calculation(calculation_array[(inputt, grade)], inputt, grade)


mcdm = Blueprint("mcdm", __name__, url_prefix="/mcdm")


@mcdm.route("/", methods=["POST"])
def run_mcdm():
    """
    get /mcdm/schoolarship/<id>/: runs the mcdm algorithm, including querying for all scorecards

    sample input:

    {
    "scholarship_id": "6248d7666a62d69298a0083c",
    "number_of_awards": "5"
    }


    """

    form = request.get_json()
    scholarship_id = form.get("scholarship_id")

    scholarship_info = db.scholarships.find_one({"_id": ObjectId(scholarship_id)})
    num_of_awards = scholarship_info["number_of_awards"]

    # if scholarship_info.get("winners"):
    #     return {
    #         "message": "Retrieved previous calculation",
    #         "winners": scholarship_info.get("winners"),
    #     }, status.HTTP_200_OK

    cursor = get_scorecards(scholarship_id)
    score_log = {}

    for document in cursor:
        # if user doesnt exist,add them with a val 0 (total awards)
        # go through all score cards, calculate if won, update by 1 if so
        bestStudent = algorithm(("base", document["student_id"]))

        judge_academic = int(document["judge_scores"]["academic"])
        judge_leadership = int(document["judge_scores"]["leadership"])
        judge_volunteer = int(document["judge_scores"]["volunteer"])

        weight_academic = scholarship_info.get("weightings").get("academic")
        weight_leadership = scholarship_info.get("weightings").get("leadership")
        weight_volunteer = scholarship_info.get("weightings").get("volunteer")

        studentDict = {
            ("base", "acedemic"): 1,
            ("base", "leadership"): 1,
            ("base", "volunteer"): 1,
            (document["student_id"], "acedemic"): judge_academic,
            (document["student_id"], "leadership"): judge_leadership,
            (document["student_id"], "volunteer"): judge_volunteer,
        }
        bestStudent.setDictionary(studentDict)
        bestStudent.set_weight(
            {
                "acedemic": weight_academic,
                "leadership": weight_leadership,
                "volunteer": weight_volunteer,
            },
            "Grade",
        )

        student_total_score = bestStudent.get_calculation(
            document["student_id"], "Grade"
        )
        score_log[document["student_id"]] = student_total_score

    sortedLog = sorted(score_log.items(), key=lambda x: x[1], reverse=True)

    result = []
    count = 0

    for key in sortedLog:
        result.append(key)
        count += 1
        if count >= int(num_of_awards):
            break

    student_winners = [i[0] for i in result]

    winners = add_winners(student_winners, scholarship_id)

    # success
    return {
        "message": "Calculations successful",
        "winners": winners
        # "_id": _id,
        # "student_total_score" : student_total_score
    }, status.HTTP_200_OK
