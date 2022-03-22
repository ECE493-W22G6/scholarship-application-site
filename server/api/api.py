import os
from flask import Flask, make_response, request
from flask_api import status
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

from db import db

load_dotenv()
MONGO_CLIENT = os.getenv("MONGO_CLIENT")

# IMPORTANT: remember to add "/" at the end
app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_CLIENT
mongo = PyMongo(app)


@app.route("/hello")
def hello_world():
    return {"hello": "hello world!"}


@app.route("/users/register/", methods=["POST"])
def register():
    """
    post /user/register/
    post /user/login/
    get /user/<id>/: gives user profile with default application id (?)

    post /user/<id>/application/: updates the default application of the user, creating one if there isn't one
    put /user/password/: change user password (requires old password to be given)
    put /user/icon/: change user icon (requires check if user is org, else fail)
    """
    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")

    user = db.users.find_one({"email": email})

    if user:
        return "User already exists", status.HTTP_409_CONFLICT

    new_user = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": generate_password_hash(password, method="sha256"),
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
        return "User with given email not found", status.HTTP_401_UNAUTHORIZED
    if not check_password_hash(user["password"], password):
        return "Password is incorrect", status.HTTP_401_UNAUTHORIZED

    # success
    return "Login successful", status.HTTP_200_OK


@app.route("/applications")
def application():
    """
    get /applications/<id>/: gets the application with the given id
    """
    return


@app.route("/scholarships")
def all_scholarships():
    """
    get /scholarships/: returns all scholarship in db
    get /scholarships/<id>/: returns specific scholarship with given id including its applications (ids) and judges (ids)
    post /scholarships/: creates new scholarship and returns new scholarship data
    delete /scholarships/<id>/: deletes the scholarship with the given id
    """
    return


@app.route("/organizations")
def organizations():
    """
    get /organizations/
    get /organizatons/<id>/: gets the organization with the id
    get /organizations/<id>/scholarships/:
    """
    return


@app.route("/judge")
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
