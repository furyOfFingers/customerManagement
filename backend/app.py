import time
import json
import os
from flask import Flask, request, jsonify
from db.database import init_db, db_session
from models.user import User


app = Flask(__name__)
init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


@app.route('/api/users', methods=["GET"])
def get_users():
    if request.method == "GET":
        try:
            users = User.query.all()
            print('usersss', type(json.dumps(str(users))))
            return str(users)

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'


@app.route('/api/auth/signup', methods=["POST"])
def auth_signup():
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


@app.route('/api/auth/signin', methods=["POST"])
def auth_signin():
    time.sleep(3)
    return jsonify(request.get_json())


if __name__ == '__main__':
    config_path = os.path.dirname(os.path.realpath(__file__))
    config = open(config_path+'/config.json')
    data = json.load(config)
    SERVER_HOST = data['SERVER_HOST']
    SERVER_PORT = data['SERVER_PORT']

    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
