from flask import Blueprint, request
from flask_api import status

from api.database import db

notifications = Blueprint("notifications", __name__, url_prefix="/notifications")


@notifications.route("/user/<user_id>/", methods=["GET", "POST"])
def notification(user_id):
    if request.method == "GET":
        n = list(db.notifications.find({"user_id": user_id}))
        if not notifications:
            return {
                "message": "User does not have any notifications",
            }, status.HTTP_200_OK
        for s in n:
            s["_id"] = str(s["_id"])
        return {"result": n}, status.HTTP_200_OK
    elif request.method == "POST":
        notification_dict = {
            "user_id": user_id,
            "message": request.get_json().get("message"),
        }
        new_notification = db.notifications.insert_one(notification_dict)

        return {
            "message": "Notification successfully added",
            "notification_id": str(new_notification.inserted_id),
        }, status.HTTP_200_OK
