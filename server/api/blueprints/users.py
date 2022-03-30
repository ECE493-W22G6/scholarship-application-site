from flask import current_app, Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_api import status

from bson.objectid import ObjectId

from api.db import db

users = Blueprint("users", __name__, url_prefix="/users")


@users.route("/register/", methods=["POST"])
def register():
    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    user_type = request.form.get("type")  # student, organization, judge

    user = db.users.find_one({"email": email})

    if user:
        return {
            "message": "User already exists",
        }, status.HTTP_409_CONFLICT

    new_user = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": generate_password_hash(password, method="sha256"),
        "type": user_type,
    }

    user = db.users.insert_one(new_user)

    return {
        "message": "Success",
        "id": str(user.inserted_id),
    }, status.HTTP_201_CREATED


@users.route("/login/", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    user = db.users.find_one({"email": email})

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user:
        return {
            "message": "User with given email not found",
        }, status.HTTP_404_NOT_FOUND
    if not check_password_hash(user["password"], password):
        return {
            "message": "Password is incorrect",
        }, status.HTTP_401_UNAUTHORIZED

    # success
    return {
        "message": "Login successful",
    }, status.HTTP_200_OK


@users.route("/users/<user_id>/password/", methods=["POST"])
def change_password(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {
            "message": "User with given email not found",
        }, status.HTTP_404_NOT_FOUND
    current_password = request.form.current_password
    if not check_password_hash(user["password"], current_password):
        return {
            "message": "Current password is incorrect",
        }, status.HTTP_401_UNAUTHORIZED

    new_password = request.form.new_password
    _ = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password ": generate_password_hash(new_password, method="sha256")}},
    )

    return {
        "message": "Password changed successfully",
    }, status.HTTP_200_OK


@users.route("/users/<user_id>/icon/", methods=["POST"])
def change_icon(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {
            "message": "User with given email not found",
        }, status.HTTP_404_NOT_FOUND
    if user["type"] != "organization":
        return {
            "message": "User does not have sufficient permission to change icon",
        }, status.HTTP_401_UNAUTHORIZED

    _ = db.users.update_one(
        {"_id": ObjectId(user_id)}, {"$set": {"icon": request.form.icon_url}}
    )

    return {
        "message": "Icon changed successfully",
    }, status.HTTP_200_OK


@users.route("/users/<user_id>/", methods=["GET"])
def get_user(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User not found", status.HTTP_404_NOT_FOUND

    del user["_id"]
    del user["password"]
    return user, status.HTTP_200_OK
