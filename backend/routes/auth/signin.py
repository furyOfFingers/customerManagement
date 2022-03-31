from flask import request
from models.user import User
from cerberus import Validator
# from termcolor import colored
import ast


def signin():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        v.require_all = True
        schema = {
            'password': {
                'type': 'string', 'minlength': 8, 'maxlength': 80
            },
            'email': {
                'type': 'string', 'regex': '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            },
        }

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            email = request_data['email']
            password = request_data['password']
            try:
                query_match = User.query.filter(User.email == email).all()

                if not query_match:
                    return {'signin': {'email': 'email or password incorrect'}}, 400

                else:
                    new_dict = ast.literal_eval(str(query_match[0]))
                    is_password_match = new_dict['password'] == password

                    if is_password_match:
                        del new_dict['password']

                        return new_dict, 201
                    else:
                        return {'signin': {'email': 'email or password incorrect'}}, 400

            except Exception as e:
                return str(e), 400
    else:
        return "wrong method"
