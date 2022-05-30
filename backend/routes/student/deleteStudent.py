from db.database import db_session
from flask import request
from models.student import Student


def deleteStudent():
    if request.method == "DELETE":
        id = request.args.get("id")

        try:
            query_match = Student.query.filter_by(id=id).all()

            if not query_match:
                return {'remove': {'id': 'student not found'}}, 400
            else:
                removed_student = query_match[0]
                lastname = removed_student.lastname
                firstname = removed_student.firstname[0]
                patronymic = removed_student.patronymic[0]

                Student.query.filter_by(id=id).delete()
                db_session.flush()
                db_session.commit()
                return "student {} {}. {}. has been removed.".format(lastname,
                                                                     firstname,
                                                                     patronymic), 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
