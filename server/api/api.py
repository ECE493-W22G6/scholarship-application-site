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

- get /applications/<id>/: gets the application with the given id

- get /scholarships/: returns all scholarship in db
- get /scholarships/<id>/: returns specific scholarship with given id including its applications (ids) and judges (ids)
- post /scholarships/: creates new scholarship and returns new scholarship data
- delete /scholarships/<id>/: deletes the scholarship with the given id
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
def application():
    # TODO
    # get user id
    # get scholarship id
    # add application id to scholarship applications
    # add application to collection
    return


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


@app.route("/judge/scholarship/<scholarship_id>/")
def judge():
    """
    get /judge/scholarship/<id>/: gets the criterias for the given scholarship
    post /judge/scholarship/<id>/application/<id>/: creates new scorecard with the scores the judge gave for each criteria
    """

    return


@app.route("/scorecard")
def scorecard():
    """
    get /scorecard/<id>/: gets the scorecard with given id
    get /scorecard/scholarship/<id>/: gets the scorecards for the given scholarship id
    """
    return


@app.route("/notification")
def notification():
    """
    get /notification/user/<id>/: gets all the notifications for a user
    post /notification/user/<id>/: adds the payload notification to the user's notification list
    """
    return


@app.route("/mcdm")
def mcdm():
    """
    get /mcdm/schoolarship/<id>/: runs the mcdm algorithm, including querying for all scorecards
    """
    return


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
