import json
import os
import unittest

import mongomock
from unittest.mock import patch
import api
from api.api import app


app.config["MONGO_URI"] = os.getenv("TEST_CLIENT")


class PyMongoMock(mongomock.MongoClient):
    def init_app(self, app):
        return super().__init__()


class TestUserEndpoints(unittest.TestCase):
    def test_register_happy_path(self):
        request = {
            "email": "krusty@krab.com",
            "password": "p4ssw0rd",
            "first_name": "spongebob",
            "last_name": "squarepants",
            "type": "student",
        }
        with patch.object(api, "db", PyMongoMock()):
            # api.db.testDatabase.drop_collection("users")
            # if "users" in api.db.list_collection_names():
            #     api.db.get_collection("users").drop()

            test_client = app.test_client()

            resp = test_client.post("/users/register/", data=request)

            self.assertEqual(resp.status_code, 201)

            resp_json = resp.get_json()
            print(resp_json)

            expected_json = {"message": "Success"}
            self.assertIn(expected_json, resp_json)

            # assert new user inserted into db.users
            user_id = resp_json.get("id")
            stored_obj = api.db.find_one({"_id": mongomock.ObjectId(user_id)})
            print(stored_obj)

        return


# def test_version():
#     assert __version__ == '0.1.0'
