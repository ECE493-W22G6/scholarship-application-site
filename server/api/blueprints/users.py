from flask import Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_api import status

from bson.objectid import ObjectId

from api.database import (
    add_user,
    get_user_by_email,
    get_user_by_id,
    update_user_icon,
    update_user_password,
)

users = Blueprint("users", __name__, url_prefix="/users")


@users.route("/register/", methods=["POST"])
def register():
    form = request.get_json()
    email = form.get("email")
    password = form.get("password")
    first_name = form.get("first_name")
    last_name = form.get("last_name")
    user_type = form.get("type")  # student, organization, judge

    user = get_user_by_email(email)

    if user:
        return {
            "message": "User already exists",
            "id": str(user["_id"]),
        }, status.HTTP_409_CONFLICT

    new_user = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": generate_password_hash(password, method="sha256"),
        "type": user_type,
    }

    new_user_id = add_user(new_user)

    return {
        "message": "Success",
        "id": str(new_user_id),
    }, status.HTTP_201_CREATED


@users.route("/login/", methods=["POST"])
def login():
    form = request.get_json()
    email = form.get("email")
    password = form.get("password")

    user = get_user_by_email(email)

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
        "id": str(user.get("_id")),
    }, status.HTTP_200_OK


@users.route("/<user_id>/password/", methods=["POST"])
def change_password(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return {
            "message": "User with given email not found",
        }, status.HTTP_404_NOT_FOUND
    current_password = request.form.current_password
    if not check_password_hash(user["password"], current_password):
        return {
            "message": "Current password is incorrect",
        }, status.HTTP_401_UNAUTHORIZED

    resp = update_user_password(user_id, request.form.new_password)

    return {
        "message": "Password changed successfully",
    }, status.HTTP_200_OK


@users.route("/<user_id>/icon/", methods=["POST"])
def change_icon(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return {
            "message": "User with given email not found",
        }, status.HTTP_404_NOT_FOUND
    if user["type"] != "organization":
        return {
            "message": "User does not have sufficient permission to change icon",
        }, status.HTTP_401_UNAUTHORIZED

    resp = update_user_icon(user_id, request.form.icon_url)

    return {
        "message": "Icon changed successfully",
    }, status.HTTP_200_OK


@users.route("/<user_id>/", methods=["GET"])
def get_user(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return "User not found", status.HTTP_404_NOT_FOUND

    del user["_id"]
    del user["password"]
    return user, status.HTTP_200_OK
