import json
from flask import Blueprint, jsonify, request
from flask_api import status

from bson.objectid import ObjectId

from api.database import db

scholarships = Blueprint("scholarships", __name__, url_prefix="/scholarships")


@scholarships.route("/", methods=["GET", "POST"])
def scholarship():
    if request.method == "GET":
        if request.args and request.args.get("organization_id"):
            res = list(
                db.scholarships.find(
                    {"organization_id": request.args.get("organization_id")}
                )
            )
        else:
            res = list(db.scholarships.find())
        for s in res:
            s["_id"] = str(s["_id"])
        return jsonify({"result": res}), status.HTTP_200_OK
    elif request.method == "POST":
        request_data = request.get_json()
        user_id = request_data.get("organization_id")
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"message": "User does not exist"}, status.HTTP_404_NOT_FOUND
        if user.get("type") != "organization":
            return {
                "message": "User cannot create scholarships"
            }, status.HTTP_401_UNAUTHORIZED

        new_scholarship = json.loads(request.get_data().decode("utf-8"))
        new_scholarship["questions"] = [
            question.strip() for question in new_scholarship.get("questions").split(";")
        ]
        new_scholarship["weightings"] = {
            criteria: float(weighting) / 100
            for [criteria, weighting] in [
                criteriaweighting.split(":")
                for criteriaweighting in [
                    pair.strip()
                    for pair in new_scholarship.get("weightings").split(",")
                ]
            ]
        }
        new_scholarship["organization_name"] = user.firstname

        db.scholarships.insert_one(new_scholarship)

        return {"message": "Scholarship successfully created"}, status.HTTP_201_CREATED


@scholarships.route("/<scholarship_id>/", methods=["GET"])
def get_scholarship(scholarship_id):
    scholarship_dict = db.scholarships.find_one({"_id": ObjectId(scholarship_id)})
    if not scholarship_dict:
        return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND
    scholarship_dict["_id"] = str(scholarship_dict["_id"])
    return scholarship_dict, status.HTTP_200_OK


@scholarships.route("/<scholarship_id>/applications/", methods=["GET"])
def get_scholarship_applications(scholarship_id):
    scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND
    return scholarship.get("applications"), status.HTTP_200_OK


@scholarships.route("/<scholarship_id>/judge/", methods=["GET", "POST"])
def judge(scholarship_id):
    if request.method == "GET":
        scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
        if not scholarship:
            return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND
        return (
            db.scholarships.find({"_id": ObjectId(scholarship_id)}, {"judges": 1}),
            status.HTTP_200_OK,
        )
    elif request.method == "POST":
        scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
        if not scholarship:
            return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND
        judges = request.form.get("judges")
        db.scholarship.update_one(
            {"_id": ObjectId(scholarship_id)},
            {"$set": {"judges ": judges}},
        )
        return {"message": "Judges successfully added"}, status.HTTP_200_OK


@scholarships.route("<scholarship_id>/judge/<application_id>/", methods=["POST"])
def judge_application(scholarship_id, application_id):
    request_data = request.get_json()
    user_id = request_data.get("judge_id")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User does not exist", status.HTTP_404_NOT_FOUND
    if user.get("type") != "judge":
        return "User cannot judge applications", status.HTTP_401_UNAUTHORIZED

    application = db.applications.find_one({"_id": ObjectId(application_id)})
    if not application:
        return {"message": "Application not found"}, status.HTTP_404_NOT_FOUND

    scholarship_id = scholarship_id
    if not application:
        return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND

    student_id = request_data.get("student_id")
    mcdm_input = {}
    for criteria, score in request_data.get("judge_scores").items():
        mcdm_input[f"{student_id}.{criteria}"] = int(score)
    scorecard_dict = request_data | mcdm_input
    inserted_scorecard = db.scorecards.insert_one(scorecard_dict)

    return {
        "message": "Scorecard successfully created",
        "id": str(inserted_scorecard.inserted_id),
    }, status.HTTP_201_CREATED
