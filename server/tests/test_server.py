import json
import os
import unittest

import mongomock
from unittest.mock import patch
from api.api import create_app
from api import database
import json


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
        with patch.object(database, "db", PyMongoMock().db):
            test_client = create_app().test_client()

            resp = test_client.post(
                "/users/register/",
                data=json.dumps(request),
                content_type="application/json",
            )

            self.assertEqual(resp.status_code, 201)

            resp_json = resp.get_json()
            print(resp_json)

            expected_json = {"message": "Success"}
            # self.assertIn(expected_json, resp_json)

            # assert new user inserted into db.users
            user_id = resp_json.get("id")
            stored_obj = database.db.users.find_one(
                {"_id": mongomock.ObjectId(user_id)}
            )
            print(stored_obj)

        return
