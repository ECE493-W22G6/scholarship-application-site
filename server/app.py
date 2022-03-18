from flask import Flask

# IMPORTANT: remember to add "/" at the end
app = Flask(__name__)


@app.route("/user")
def register():
    """
    post /user/register/
    post /user/login/
    get /user/<id>/: gives user profile with default application id (?)

    post /user/<id>/application/: updates the default application of the user, creating one if there isn't one
    put /user/password/: change user password (requires old password to be given)
    put /user/icon/: change user icon (requires check if user is org, else fail)
    """
    return


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
    app.run()
