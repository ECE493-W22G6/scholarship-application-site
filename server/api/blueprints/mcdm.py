from flask import Blueprint, request
from flask_api import status

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
    student_id = form.get("student_id")
    aplication_id = form.get("application_id")
    judge_id = form.get("judge_id")
    scholarship_id = form.get("scholarship_id")
    judge_score = form.get("judge_score")
    weight_criteria = form.get("weight_criteria")

    bestStudent = algorithm(('base', student_id))
    
    studentDict = {
    ('base','acedemic'):1,
    ('base','leadership'):1,
    ('base','volunteer'):1,
    (student_id,'acedemic'):judge_score['academic'],
    (student_id,'leadership'):judge_score['leadership'],
    (student_id,'volunteer'):judge_score['volunteer']
    }
    bestStudent.setDictionary(studentDict)
    bestStudent.set_weight({'acedemic':weight_criteria['academic'],'leadership':weight_criteria['leadership'],
    'volunteer':weight_criteria['volunteer']}, 'Grade')
    
    student_total_score = bestStudent.get_calculation(student_id, 'Grade')


    # success
    return {
        "message": "Calculations successful",
        "Student_id": student_id,
        "student_total_score" : student_total_score
    }, status.HTTP_200_OK
