from flask import request
from db.database import db_session
from models.user import User
from cerberus import Validator
from termcolor import colored


def signup():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        v.require_all = True
        schema = {
            'email': {
                'type': 'string', 'regex': '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            },
            'gender': {
                'type': 'string', 'allowed': ['male', 'female']
            },
            'password': {
                'type': 'string', 'minlength': 8, 'maxlength': 80
            },
            'username': {
                'type': 'string', 'minlength': 5, 'maxlength': 30
            },
        }

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            username = request_data['username']
            email = request_data['email']
            gender = request_data['gender']
            password = request_data['password']

            new_user = User(username=username, email=email,
                            password=password, gender=gender)
            try:
                db_session.add(new_user)
                db_session.flush()
                db_session.commit()
                return {'username': username, 'id': new_user.id, 'gender': gender, 'email': email}, 201

            except Exception as e:
                db_session.rollback()
                if 'UNIQUE constraint failed: user.email' in str(e):
                    return {'signup': {'email': 'email already in use'}}, 400
                return str(e), 400
    else:
        return "wrong method"
