from db.database import db_session
from flask import request
from models.student import Student


def updateStudent():
    if request.method == "PUT":
        request_data = request.get_json()
        id = request_data['id']

        try:
            query_match = Student.query.filter_by(id=id).all()

            if not query_match:
                return {'updateStudent': {'id': 'student not found'}}, 400
            else:
                update_student = query_match[0]

                update_student.lastname = request_data['lastname']
                update_student.firstname = request_data['firstname']
                update_student.patronymic = request_data['patronymic']
                update_student.phone = request_data['phone']
                update_student.birthday = request_data['birthday']
                update_student.gender = request_data['gender']

                if 'photo' in request_data:
                    update_student.photo = request_data['photo']

                if 'teachers' in request_data:
                    teachers_string = ','.join(request_data['teachers'])
                    update_student.teachers = teachers_string

                db_session.commit()
                return "", 204

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
