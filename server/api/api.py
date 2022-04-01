import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
MONGO_CLIENT = os.getenv("MONGO_CLIENT_ROOT")


def create_app():
    app = Flask(__name__)

    app.config["MONGO_URI"] = MONGO_CLIENT

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

    cors = CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
