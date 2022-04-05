# API Docs

## Users

### GET `/users/<user_id>`

Gets information about the user

Success response:

- email: string,
- first_name: string,
- last_name: string,
- gender: {"female"|"male"},
- user_type: {"student"|"organization"|"judge"},
- grade: int,
- address: string,
- phone_number: string,
- parent_email: string,
- parent_phone_number: string
- application_id: string
- code: 200 ok

Failure response:

- Bad user id
  - message: User not found
  - code: 404 not found

### POST `/users/register/`

Registers a user account

Request body:
form: {
email: string,
password: string,
first_name: string,
last_name: string,
gender: {"female"|"male"},
user_type: {"student"|"organization"|"judge"},
grade: int,
address: string,
phone_number: string,
parent_email: string,
parent_phone_number: string
}

Sucess response:

- message: "Success"
- code: 201 created

Fail response:

- User already exist case:
  - body: "User already exists"
  - code: 409 conflict

### POST `/user/login/`

Login attempt

Request body:
form: {
email: string
password: string
}

Success response:

- message: "Login successful"
- code: 200 Ok

Failure response:

- Bad email
  - message: User with given email not found
  - code: 404 not found
- Bad password
  - message: Password is incorrect
  - code: 401 unauthorized

### POST `/user/<user_id>/password`

Change password

Request body:
form: {
current_password: string
new_password: string
}

Success response:

- message: "Passwordd changed successfully"
- code: 200 ok

Failure response:

- Bad email:
  - message: User with given email not found
  - code: 404 not found
- Bad current password;
  - message: Current password is incorrect
  - code: 401 unauthorized

### POST `/user/<user_id>/icon`

Change icon
**Only permitted for organization type accounts**

- Request body:
  form: {
  icon_url: string
  }

Success response:

- message: Icon changed successfully
- code: 200 ok

Failure response:

- Bad email:
  - message: User with given email not found
  - code: 404 not found
- Non-organization:
  - message: User does not have sufficient permission to change icon
  - code: 401 unauth

===============================

TODO.

## Applications

### POST `/applications/`

Submits an application for a scholarship from a user
**Only permitted for student type accounts**

- Request body:
  data: {
  user_id: string,
  scholarship_id: string
  <application>
  }

Success response:

- message: Application successfully submitted
- application_id: application.inserted_id
- code: 200 ok

Failure response:

- Bad user id:
  - messsage: User does not exist
  - code: 404 not found
- Bad user type:
  - message: User cannot create applications
  - code: 401 unauthorized
- bad scholarship id:
  - message: Scholarship does not exist
  - code: 404 not found

### GET `/applications/<application_id>/`

Gets the specified application

Success response:

- <application>
- code: 200 ok

Failure response:

- bad application id
  - message: Application does not exist
  - code: 404 not found

### POST `/application/<application_id>/judge/`

Creates a new scorecard for the application by the current user
**Only permitted for judge type accounts**

Request body:

- user_id: string

Success response:

- message: Scorecard succesfully created
- id: inserted_scorecard.inserted_id
- code: 201 created

Failure response:

- bad user id
  - message: "User does not exist"
  - code: 404 not found
- bad user type:
  - User cannot judge applications
  - code: 401 unauthorized
- bad application id:
  - message: Application not found
  - code: 404 not found

===============================

## Scholarships

### GET `/scholarships/`

Gets all scholarships in the database

Sucess response:

- [<scholarship> ...]
- code: 200 ok

### POST `/scholarships/`

Creates a new scholarship

Request body:

- user_id: string
- <scholarship>

Success response:

- message: Scholarship successfully created
- code: 201 created

### POST `/scholarships/`

Creates a new scholarship

Request body:

- user_id: string
- <scholarship>

Success response:

- message: Scholarship successfully created
- code: 201 created

Failure response:

- bad user id:
  - message: User does not exist
  - code: 404 not found
- user not type organization
  - message: User cannot create scholarships
  - code: 401 unauthorized

### GET `/scholarships/<scholarship_id>`

Gets the scholarship with given id

Success response:

- <scholarship>
- code: 200 ok

Failure response:

- scholarship not found:
  - message: "Scholarship not found"
  - code: 404 not found

### GET `/scholarships/<scholarship_id>/applications`

Gets all application ids corresponding to a scholarship

Success response:

- [<application> ...]
- code: 200 ok

Failure response:

- scholarship not found
  - message: Scholarship not found
  - code: 404 not found

### GET `/scholarships/<scholarship_id>/judge/`

Gets all judge user ids for a given scholarship

Success response:

- [judge_id ...]
- 200 ok

Failure response:

- scholarship not found:
  - message: Scholarship not found
  - code: 404 not found

### POST `/scholarships/<scholarship_id>/judge/`

Adds the judges for the given scholarship id

Request body:

- form: {judge_id ...}

Success response:

- message: Judges successfully added
- code: 200 ok

Failure response:

- scholarship not found:
  - message: Scholarship not found
  - code: 404 not found

===============================

## Scorecards

### GET `/scorecard/<scorecard_id>/`

Gets the specified scorecard with the given id

Successs response:

- <scorecard>
- code: 200 ok

Failure response:

- Scorecard not found
  - message: Scorecard not found
  - code: 404 not found

### GET `/scorecard/scholarship/<scholarship_id>/`

Gathers all scorecards for the given scholarship

Success response:

- [<scorecard>]
- code: 200 ok

Failure response:

- No scorecards exist for the given scholarship
  - message: No scorecards found for given scholarship

===============================

## Notifications

### GET `/notifications/user/<user_id>`

Gets the notifications of the given user

Success response:

- User has no notifications:
  - message: User does not have any notifications
  - code: 200 ok
- User has notifications:
  - [<notifications>]
  - code: 200 ok

### POST `/notifications/user/<user_id>`

Adds a new notification to the user's inbox

Request body:

- {<data>}

Success notification:

- message: Notification successfully added
- notification_id: notification.inserted_id
- code: 200 ok

===============================

## MCDM

### POST `/mcdm`

Gets feeded scholarship_id which then the score is calculated for that student.
the score of the student is stored in student_total_score.
Each student for that scholarship is paired up with a total scored which is then
sorted.

num_of_awards is the amount of awards available for that scholarship and therefore
the top X students are posted in db.scholarships['winners'], X being the
num_of_awards

input example:
{
"scholarship_id" : "101"
}

Success response:

- message: Calculations successful,
  winners: LIST OF WINNERS
  code: 200 ok

### POST `/scholarships/winners/`

Adds the winners for the given scholarship id

Request body:

- student_winners, student_id from mcdm

Success response:

- message: Calculations successful,
  winners: LIST OF WINNERS
  code: 200 ok
- message: Retrieved previous calculation
  winners: [<user_id>...]
  code: 200 ok
