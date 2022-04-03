import json
from flask import Blueprint, request
from flask_api import status

from bson.objectid import ObjectId

from api.database import db


applications = Blueprint("applications", __name__, url_prefix="/applications")


@applications.route("/", methods=["POST"])
def submit_application():
    # get user id
    request_data = request.get_json()
    user_id = request_data.get("user_id")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {
            "message": "User does not exist",
        }, status.HTTP_404_NOT_FOUND
    if user.get("type") != "student":
        return {
            "message": "User cannot create applications",
        }, status.HTTP_401_UNAUTHORIZED

    # get scholarship id
    scholarship_id = request_data.get("scholarship_id")
    scholarship = db.scholarships.find_one({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return {"message": "Scholarship does not exist"}, status.HTTP_404_NOT_FOUND

    new_application = json.loads(request.get_data().decode("utf-8"))

    application = db.applications.insert_one(new_application)
    # add application id to scholarship applications
    db.scholarships.update_one(
        {"_id": ObjectId(scholarship_id)},
        {"$push": {"applications": str(application.inserted_id)}},
    )
    return {
        "message": "Application successfully submitted",
        "application_id": str(application.inserted_id),
    }, status.HTTP_200_OK


@applications.route("/<application_id>", methods=["GET"])
def get_applications(application_id):
    application = db.applications.find_one({"_id": ObjectId(application_id)})
    if not application:
        return {"message": "Application does not exist"}, status.HTTP_404_NOT_FOUNDs

    return application, status.HTTP_200_OK


@applications.route("/<application_id>/judge/", methods=["POST"])
def judge_application(application_id):
    user_id = request.data.get("user_id")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User does not exist", status.HTTP_404_NOT_FOUND
    if user.get("type") != "judge":
        return "User cannot judge applications", status.HTTP_401_UNAUTHORIZED

    application = db.applications.find_one({"_id": ObjectId(application_id)})
    if not application:
        return {"message": "Application not found"}, status.HTTP_404_NOT_FOUND

    scholarship_id = application.get("scholarship_id")

    scorecard = {
        "scholarship_id": scholarship_id,
        "application_id": application_id,
        "judge_id": user_id,
        "score": request.get_data(),
    }
    inserted_scorecard = db.scorecards.insert_one(scorecard)

    return {
        "message": "Scorecard successfully created",
        "id": str(inserted_scorecard.inserted_id),
    }, status.HTTP_201_CREATED
