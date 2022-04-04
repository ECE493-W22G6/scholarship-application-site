from flask import Blueprint, request
from flask_api import status

from api.database import (
    get_scorecard
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
    _id = form.get("_id")

    bestStudent = algorithm(('base', _id))
    user_id = get_scorecard(_id)

    studentDict = {
    ('base','acedemic'):1,
    ('base','leadership'):1,
    ('base','volunteer'):1,
    (_id,'acedemic'):user_id['judge_scores']['academic'],
    (_id,'leadership'):user_id['judge_scores']['leadership'],
    (_id,'volunteer'):user_id['judge_scores']['volunteer']
    }
    bestStudent.setDictionary(studentDict)
    bestStudent.set_weight({'acedemic':user_id['weight_criteria']['academic'],'leadership':user_id['weight_criteria']['leadership'],
    'volunteer':user_id['weight_criteria']['volunteer']}, 'Grade')
    
    student_total_score = bestStudent.get_calculation(_id, 'Grade')


    # success
    return {
        "message": "Calculations successful",
        "_id": _id,
        "student_total_score" : student_total_score
    }, status.HTTP_200_OK
