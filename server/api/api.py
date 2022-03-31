import os
from flask import Flask
from dotenv import load_dotenv

from api.database import db

load_dotenv()
MONGO_CLIENT = os.getenv("MONGO_CLIENT_ROOT")

# IMPORTANT: remember to add "/" at the end


def create_app(mongo_uri=None):
    app = Flask(__name__)

    if mongo_uri:
        app.config["MONGO_URI"] = mongo_uri

    app.config["MONGO_URI"] = MONGO_CLIENT
    # db.init_app(app)

    from api.blueprints.users import users
    from api.blueprints.applications import applications
    from api.blueprints.scholarships import scholarships
    from api.blueprints.notifications import notifications
    from api.blueprints.scorecards import scorecards
    from api.blueprints.mcdm import mcdm

    app.register_blueprint(users)
    app.register_blueprint(applications)
    app.register_blueprint(scholarships)
    app.register_blueprint(notifications)
    app.register_blueprint(scorecards)
    app.register_blueprint(mcdm)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
