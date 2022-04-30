from flask import request
from models.teacher import Teacher
from db.database import db_session


def updateTeacher():
    if request.method == "PUT":
        request_data = request.get_json()
        id = request_data['id']

        try:
            query_match = Teacher.query.filter_by(id=id).all()

            if not query_match:
                return {'updateTeacher': {'id': 'teacher not found'}}, 400
            else:
                update_teacher = query_match[0]

                update_teacher.lastname = request_data['lastname']
                update_teacher.firstname = request_data['firstname']
                update_teacher.patronymic = request_data['patronymic']
                update_teacher.phone = request_data['phone']
                update_teacher.birthday = request_data['birthday']
                update_teacher.gender = request_data['gender']
                update_teacher.photo = request_data.get('photo', '')

                db_session.commit()
                return "", 204

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
