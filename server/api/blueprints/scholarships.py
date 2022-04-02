from flask import Blueprint, request
from flask_api import status

from bson.objectid import ObjectId

from api.database import db

scholarships = Blueprint("scholarships", __name__, url_prefix="/scholarships")


@scholarships.route("/", methods=["GET", "POST"])
def scholarship():
    if request.method == "GET":
        return db.scholarships.find({}), status.HTTP_200_OK
    elif request.method == "POST":
        user_id = request.data.get("user_id")
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"message": "User does not exist"}, status.HTTP_404_NOT_FOUND
        if user.get("type") != "organization":
            return {
                "message": "User cannot create scholarships"
            }, status.HTTP_401_UNAUTHORIZED

        # name = request.form.get("name")
        # fields = request.form.get("fields")
        # criteria = request.form.get("criteria")
        # new_scholarship = {"name": name, "fields": fields, "criteria": criteria}

        new_scholarship = request.get_data()

        db.scholarships.insert_one(new_scholarship)

        return {"message": "Scholarship successfully created"}, status.HTTP_201_CREATED


@scholarships.route("/<scholarship_id>/", methods=["GET"])
def get_scholarship(scholarship_id):
    scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return {"message": "Scholarship not found"}, status.HTTP_404_NOT_FOUND
    return scholarship, status.HTTP_200_OK


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
