from cerberus import Validator
from db.database import db_session
from flask import request
from models.student import Student


def createStudent():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        v.require_all = True
        schema = {
            'lastname': {
                'type': 'string', 'minlength': 2, 'maxlength': 80
            },
            'firstname': {
                'type': 'string', 'minlength': 2, 'maxlength': 80
            },
            'patronymic': {
                'type': 'string', 'minlength': 2, 'maxlength': 80
            },
            'phone': {
                'type': 'string', 'minlength': 5, 'maxlength': 30
            },
            'birthday': {
                'type': 'string'
            },
            'photo': {
                'type': 'string', 'required': False
            },
            'gender': {
                'type': 'string', 'allowed': ['male', 'female']
            },
        }
        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            lastname = request_data['lastname']
            firstname = request_data['firstname']
            patronymic = request_data['patronymic']
            phone = request_data['phone']
            birthday = request_data['birthday']
            gender = request_data['gender']
            photo = request_data.get('photo', '')
            # groups = request_data['groups']
            # parents = request_data['parents']
            # payment = request_data['payment']
            # is_phone_number_client = request_data['is_phone_number_client']

            new_student = Student(
                lastname=lastname,
                firstname=firstname,
                patronymic=patronymic,
                phone=phone,
                birthday=birthday,
                photo=photo,
                gender=gender,
                # groups=groups,
                # parents=parents,
                # payment=payment,
                # is_phone_number_client=is_phone_number_client,
            )
            try:
                db_session.add(new_student)
                db_session.flush()
                db_session.commit()
                return {
                    "lastname": lastname,
                    "firstname": firstname,
                    "patronymic": patronymic,
                    "phone": phone,
                    "birthday": birthday,
                    "photo": photo,
                    "gender": gender,
                    "id": new_student.id,
                    "date_created": new_student.date_created
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
