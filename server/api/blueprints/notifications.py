from flask import current_app, Blueprint, request
from flask_api import status

from bson.objectid import ObjectId

from api.db import db

notifications = Blueprint("notifications", __name__, url_prefix="/notifications")


@notifications.route("/user/<user_id>/", methods=["GET", "POST"])
def notification(user_id):
    if request.method == "GET":
        notifications = db.notifications.find({"user_id": user_id})
        if not notifications:
            return {
                "message": "User does not have any notifications",
            }, status.HTTP_200_OK
        return notifications, status.HTTP_200_OK
    elif request.method == "POST":
        notification = {"user_id": user_id, "data": request.get_data()}
        return {
            "message": "Notification successfully added",
            "notification_id": str(notification.inserted_id),
        }, status.HTTP_200_OK
