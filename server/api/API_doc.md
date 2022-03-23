# API Docs

## Users

### GET `/users/<user_id>`
Gets information about the user

Success response:
- body: {
    email: string,
    first_name: string,
    last_name: string,
    gender: {"female"|"male"},
    user_type: {"student"|"organization"|"judge"},
    grade: int,
    address: string,
    phone_number: string,
    parent_email: string,
    parent_phone_number: string
    application_id: string 
}
- code: 200 ok

Failure response:
- Bad user id
    - body: User not found
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
- body: "Success"
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
- body: "Login successful"
- code: 200 Ok

Failure response:
- Bad email
    - body: User with given email not found
    - code: 404 not found
- Bad password
    - body: Password is incorrect
    - code: 401 unauthorized

### POST `/user/<user_id>/password`
Change password

Request body:
form: {
    current_password: string
    new_password: string
}

Success response:
- body: "Passwordd changed successfully"
- code: 200 ok

Failure response:
- Bad email:
    - body: User with given email not found
    - code: 404 not found
- Bad current password;
    - body: Current password is incorrect
    - code: 401 unauthorized

### POST `/user/<user_id>/icon`
Change icon
**Only permitted for organization type accounts**

- Request body:
form: {
    icon_url: string
}

Success response:
- body: Icon changed successfully
- code: 200 ok

Failure response:
- Bad email:
    - body: User with given email not found
    - code: 404 not found
- Non-organization:
    - body: User does not have sufficient permission to change icon
    - code: 401 unauth

