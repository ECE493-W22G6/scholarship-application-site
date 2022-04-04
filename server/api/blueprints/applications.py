import json
from flask import Blueprint, request
from flask_api import status

from bson.objectid import ObjectId

from api.database import db


applications = Blueprint("applications", __name__, url_prefix="/applications")


@applications.route("/", methods=["GET", "POST"])
def application_root():
    if request.method == "GET":
        scholarship_id = request.args.get("scholarship_id")
        student_id = request.args.get("student_id")
        application_dict = db.applications.find_one(
            {"user_id": student_id, "scholarship_id": scholarship_id}
        )
        if not application_dict:
            return {"message": "Application doesn't exist"}, status.HTTP_404_NOT_FOUND

        application_dict["_id"] = str(application_dict["_id"])
        return application_dict, status.HTTP_200_OK

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


@applications.route("/<application_id>/", methods=["GET"])
def get_application(application_id):
    application_dict = db.applications.find_one({"_id": ObjectId(application_id)})
    if not application_dict:
        return {"message": "Application does not exist"}, status.HTTP_404_NOT_FOUNDs
    application_dict["_id"] = str(application_dict["_id"])
    return application_dict, status.HTTP_200_OK
