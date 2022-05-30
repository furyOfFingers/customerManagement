from db.database import db_session
from flask import request
from models.teacher import Teacher


def deleteTeacher():
    if request.method == "DELETE":
        id = request.args.get("id")

        try:
            query_match = Teacher.query.filter_by(id=id).all()

            if not query_match:
                return {'remove': {'id': 'teacher not found'}}, 400
            else:
                removed_teacher = query_match[0]
                lastname = removed_teacher.lastname
                firstname = removed_teacher.firstname[0]
                patronymic = removed_teacher.patronymic[0]

                Teacher.query.filter_by(id=id).delete()
                db_session.flush()
                db_session.commit()
                return "teacher {} {}. {}. has been removed.".format(lastname,
                                                                     firstname,
                                                                     patronymic), 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
