from flask import request
from db.database import db_session
from models.user import User


def signup():
    if request.method == "POST":
        request_data = request.get_json()

        username = request_data['username']
        email = request_data['email']
        gender = request_data['gender']
        password = request_data['password']

        print('request', username)

        new_user = User(username=username, email=email,
                        password=password, gender=gender)
        try:
            db_session.add(new_user)
            db_session.flush()
            db_session.commit()
            return f'Success added {username}', 201

        except Exception as e:
            db_session.rollback()
            return str(e)
    else:
        return "wrong method"
