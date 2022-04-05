from pydoc import doc
from flask import Blueprint, request, session
from flask_api import status

from api.database import (
    get_scorecards
)

class algorithm:

    def __init__(self,inp):
        self.ourCalculations = {}
        self._grades = [] 
        self.category = inp

    def grades(self):
        return self._grades

    def get_calculation(self,inputt,grade):
        if (inputt,grade) in self.ourCalculations.keys():
            a = self.ourCalculations[(inputt,grade)]
        else:
            a = 0
        return(a)
                
    def set_calculation(self,a,inputt,grade):
        self.ourCalculations[(inputt,grade)] = a
        if not grade in self._grades:
            self._grades.append(grade)

    def set_weight(self,weights, studentID):
        for inputt in self.category:
            calculated_score = sum([weights[grade]*self.get_calculation(inputt,grade) for grade in weights.keys()])
            self.set_calculation(calculated_score, inputt,studentID)
            
    def setDictionary(self,calculation_array):
        for (inputt,grade) in calculation_array.keys():
            self.set_calculation(calculation_array[(inputt,grade)], inputt,grade)

mcdm = Blueprint("mcdm", __name__, url_prefix="/mcdm")

@mcdm.route("/test", methods=["POST"])
def run_mcdm():
    """
    get /mcdm/schoolarship/<id>/: runs the mcdm algorithm, including querying for all scorecards

    sample input:

    {
    "application_id" : "101",
    "scholarship_id" : "101",
    "judge_id" : "101",
    "student_id" : "Mustafa",
    "judge_score" : {
        "academic" : 1,
        "leadership" : 1,
        "volunteer" : 5
        },
    "weight_criteria" : {
        "academic" : 0.1,
        "leadership" : 0,
        "volunteer" : 0.9
        }
    }


    """
    
    form = request.get_json()
    _id = form.get("scholarship_id")

    num_of_awards = form.get("number_of_awards")

    cursor = get_scorecards(_id)
    score_log = {}

    for document in cursor:
        #if user doesnt exist,add them with a val 0 (total awards)
        # go through all score cards, calculate if won, update by 1 if so
        bestStudent = algorithm(('base', document['user_id']))

        studentDict = {
        ('base','acedemic'):1,
        ('base','leadership'):1,
        ('base','volunteer'):1,
        (document['user_id'],'acedemic'):document['judge_scores']['academic'],
        (document['user_id'],'leadership'):document['judge_scores']['leadership'],
        (document['user_id'],'volunteer'):document['judge_scores']['volunteer']
        }
        bestStudent.setDictionary(studentDict)
        bestStudent.set_weight({'acedemic':document['weight_criteria']['academic'],'leadership':document['weight_criteria']['leadership'],
        'volunteer':document['weight_criteria']['volunteer']}, 'Grade')
    
        student_total_score = bestStudent.get_calculation(document['user_id'], 'Grade')
        score_log[document['user_id']] = student_total_score
    
    sortedLog = sorted(score_log.items(), key=lambda x:x[1], reverse=True)

    result = []
    count = 0

    for key in sortedLog:
        result.append(key)
        count += 1
        if count >= int(num_of_awards):
            break

    student_winners = [i[0] for i in result]

    # success
    return {
        "message": "Calculations successful",
        "winners": student_winners
        # "_id": _id,
        # "student_total_score" : student_total_score
    }, status.HTTP_200_OK
