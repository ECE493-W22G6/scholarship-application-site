from flask import Blueprint

mcdm = Blueprint("mcdm", __name__, url_prefix="/mcdm")


@mcdm.route("/", methods=["GET"])
def run_mcdm():
    """
    get /mcdm/schoolarship/<id>/: runs the mcdm algorithm, including querying for all scorecards
    """
    return
