from flask import current_app, g
from werkzeug.local import LocalProxy
from werkzeug.security import generate_password_hash
from pymongo import MongoClient

from bson.objectid import ObjectId


def get_db():
    """
    Configuration method
    """
    if "db" not in g:
        g.db = MongoClient(current_app.config["MONGO_URI"]).db

    return g.db


# # Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)


def get_user_by_id(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        return user
    else:
        return {}


def get_user_by_email(email):
    user = db.users.find_one({"email": email})
    if user:
        return user
    else:
        return {}


def add_user(user):
    user = db.users.insert_one(user)

    if user:
        return str(user.inserted_id)
    else:
        return ""


def update_user_password(user_id, new_password):
    resp = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password": generate_password_hash(new_password, method="sha256")}},
    )
    return resp


def update_user_icon(user_id, new_icon_url):
    resp = db.users.update_one(
        {"_id": ObjectId(user_id)}, {"$set": {"icon_url": new_icon_url}}
    )
    return resp


def get_scorecards(scholarship_id):
    cursor = db.scorecards.find({"scholarship_id": scholarship_id})

    if cursor:
        return cursor
    else:
        return {}

def add_winners(student_winners, scholarship_id):
    resp = db.scholarships.update_one(
        {"_id": ObjectId(scholarship_id)}, {"$set": {"winners": student_winners}}
    )
    return resp
