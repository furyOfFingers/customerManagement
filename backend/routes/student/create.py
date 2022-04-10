from flask import request
from db.database import db_session
from models.student import Student
from cerberus import Validator
from termcolor import colored


def create():
    if request.method == "POST":
        request_data = request.get_json()
        # print('request_data', request_data)

        lastname = request_data['lastname']
        firstname = request_data['firstname']
        patronymic = request_data['patronymic']
        phone = request_data['phone']
        birth_day = request_data['birthday']
        photo = request_data['photo']
        gender = request_data['gender']
        # groups = request_data['groups']
        # parents = request_data['parents']
        # payment = request_data['payment']
        # is_phone_number_client = request_data['is_phone_number_client']

        new_student = Student(
            lastname=lastname,
            firstname=firstname,
            patronymic=patronymic,
            phone=phone,
            birth_day=birth_day,
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
                "birth_day": birth_day,
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
