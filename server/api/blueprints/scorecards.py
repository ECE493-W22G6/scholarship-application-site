from flask import Blueprint
from flask_api import status

from bson.objectid import ObjectId

from api.database import db

scorecards = Blueprint("scorecards", __name__, url_prefix="/scorecards")


@scorecards.route("/<scorecard_id>/", methods=["GET"])
def scorecard(scorecard_id):
    scorecard = db.scorecards.find_one({"_id": ObjectId(scorecard_id)})
    if not scorecard:
        return {"message": "Scorecard not found"}, status.HTTP_404_NOT_FOUND

    return scorecard, status.HTTP_200_OK


@scorecards.route("/scholarship/<scholarship_id>/", methods=["GET"])
def get_scorecards(scholarship_id):
    scorecards = db.scorecards.find({"scholarship_id": scholarship_id})
    if not scorecards:
        return {
            "message": "No scorecards found for given scholarship"
        }, status.HTTP_200_OK
    return scorecards, status.HTTP_200_OK
