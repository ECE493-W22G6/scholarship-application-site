import os
from flask import Flask, make_response, request
from flask_api import status
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

from db import db

load_dotenv()
MONGO_CLIENT = os.getenv("MONGO_CLIENT")

# IMPORTANT: remember to add "/" at the end
app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_CLIENT
mongo = PyMongo(app)

"""
TODO:
- post /user/<id>/application/: updates the default application of the user, creating one if there isn't one
"""


@app.route("/users/register/", methods=["POST"])
def register():
    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    user_type = request.form.get("type")  # student, organization, judge

    user = db.users.find_one({"email": email})

    if user:
        return "User already exists", status.HTTP_409_CONFLICT

    new_user = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": generate_password_hash(password, method="sha256"),
        "type": user_type,
    }

    db.users.insert_one(new_user)

    return "Success", status.HTTP_201_CREATED


@app.route("/users/login/", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    user = db.users.find_one({"email": email})

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user:
        return "User with given email not found", status.HTTP_404_NOT_FOUND
    if not check_password_hash(user["password"], password):
        return "Password is incorrect", status.HTTP_401_UNAUTHORIZED

    # success
    return "Login successful", status.HTTP_200_OK


@app.route("/users/<user_id>/password", methods=["POST"])
def change_password(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User with given email not found", status.HTTP_404_NOT_FOUND
    current_password = request.form.current_password
    if not check_password_hash(user["password"], current_password):
        return "Current password is incorrect", status.HTTP_401_UNAUTHORIZED

    new_password = request.form.new_password
    _ = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password ": generate_password_hash(new_password, method="sha256")}},
    )

    return "Password changed successfully", status.HTTP_200_OK


@app.route("/users/<user_id>/icon", methods=["POST"])
def change_icon(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User with given email not found", status.HTTP_404_NOT_FOUND
    if user["type"] != "organization":
        return (
            "User does not have sufficient permission to change icon",
            status.HTTP_401_UNAUTHORIZED,
        )

    _ = db.users.update_one(
        {"_id": ObjectId(user_id)}, {"$set": {"icon": request.form.icon_url}}
    )

    return "Icon changed successfully", status.HTTP_200_OK


@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User not found", status.HTTP_404_NOT_FOUND

    del user["_id"]
    del user["password"]
    return user, status.HTTP_200_OK


@app.route("/applications", methods=["POST"])
def submit_application():
    # get user id
    user_id = request.data.get("user_id")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User does not exist", status.HTTP_404_NOT_FOUND
    if user.get("type") != "student":
        return "User cannot create applications", status.HTTP_401_UNAUTHORIZED

    # get scholarship id
    scholarship_id = request.data.get("scholarship_id")
    scholarship = db.scholarships.find_one({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return "Scholarship does not exist", status.HTTP_404_NOT_FOUND

    new_application = {request.get_data()}

    application = db.applications.insert_one(new_application)
    # add application id to scholarship applications
    db.scholarships.update(
        {"_id": ObjectId(scholarship_id)},
        [
            {
                "$set": {
                    "applications": {
                        "$concat": ["$applications", application.inserted_id]
                    }
                }
            }
        ],
        {"multi": False},
    )
    return


@app.route("/applications/<application_id>", methods=["GET"])
def get_applications(application_id):
    application = db.applications.find_one({"_id": ObjectId(application_id)})
    if not application:
        return "Application does not exist", status.HTTP_404_NOT_FOUNDs

    return application


@app.route("/scholarships/", methods=["GET", "POST"])
def scholarships():
    if request.method == "GET":
        return db.scholarships.find({}), status.HTTP_200_OK
    elif request.method == "POST":
        user_id = request.form.get("user_id")
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return "User does not exist", status.HTTP_404_NOT_FOUND
        if user.get("type") != "organization":
            return "User cannot create scholarships", status.HTTP_401_UNAUTHORIZED

        # name = request.form.get("name")
        # fields = request.form.get("fields")
        # criteria = request.form.get("criteria")
        # new_scholarship = {"name": name, "fields": fields, "criteria": criteria}

        new_scholarship = request.get_json()

        db.scholarships.insert_one(new_scholarship)

        return "Scholarship successfully created", status.HTTP_201_CREATED


@app.route("/scholarships/<scholarship_id>", methods=["GET"])
def get_scholarship(scholarship_id):
    scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return "Scholarship not found", status.HTTP_404_NOT_FOUND
    return scholarship


@app.route("/scholarship/<scholarship_id>/applications", methods=["GET"])
def get_scholarship_applications(scholarship_id):
    scholarship = db.scholarships.find({"_id": ObjectId(scholarship_id)})
    if not scholarship:
        return "Scholarship not found", status.HTTP_404_NOT_FOUND
    return scholarship.get("applications")


@app.route("/scholarships/<scholarship_id>/add_judge/", methods=["GET", "POST"])
def add_judge(scholarship_id):
    if request.method == "GET":
        return db.scholarships.find({"_id": ObjectId(scholarship_id)}, {"judges": 1})
    elif request.method == "POST":
        judges = request.form.get("judges")
        db.scholarship.update_one(
            {"_id": ObjectId(scholarship_id)},
            {"$set": {"judges ": judges}},
        )
        return "Judges successfully added", status.HTTP_200_OK


@app.route("/application/<application_id>/judge/", methods=["POST"])
def judge_application(application_id):
    user_id = request.data.get("user_id")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User does not exist", status.HTTP_404_NOT_FOUND
    if user.get("type") != "judge":
        return "User cannot create applications", status.HTTP_401_UNAUTHORIZED

    application = db.applications.find_one({"_id": ObjectId(application_id)})
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
        "id": inserted_scorecard.inserted_id,
    }, status.HTTP_201_CREATED


@app.route("/scorecard/<scorecard_id>/")
def scorecard(scorecard_id):
    scorecard = db.scorecards.find_one({"_id": ObjectId(scorecard_id)})
    if not scorecard:
        return "Scorecard not found", status.HTTP_404_NOT_FOUND

    return scorecard, status.HTTP_200_OK


@app.route("/scorecard/scholarship/<scholarship_id>/")
def get_scorecards(scholarship_id):
    scorecards = db.scorecards.find({"scholarship_id": scholarship_id})
    if not scorecards:
        return "No scorecards found for given scholarship", status.HTTP_200_OK
    return scorecards, status.HTTP_200_OK


@app.route("/notification/user/<user_id>/", methods=["GET", "POST"])
def get_notification(user_id):
    if request.method == "GET":
        notifications = db.notifications.find({"user_id": user_id})
        if not notifications:
            return "User does not have any notifications", status.HTTP_200_OK
        return notifications
    elif request.method == "POST":
        notification = {"user_id": user_id, "data": request.get_data()}
        return {
            "message": "Notification successfully added",
            "notification_id": notification.inserted_id,
        }, status.HTTP_200_OK


@app.route("/mcdm")
def mcdm():
    """
    get /mcdm/schoolarship/<id>/: runs the mcdm algorithm, including querying for all scorecards
    """
    return


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
