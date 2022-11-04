from db.database import db_session
from flask import request
from models.student import Student


def getStudent():
    if request.method == "GET":
        id = request.args.get("id")

        try:
            query_match = Student.query.filter_by(id=id).all()

            if not query_match:
                return {'getStudent': {'id': 'student not found'}}, 400
            else:
                return {
                    "lastname": query_match[0].lastname,
                    "firstname": query_match[0].firstname,
                    "patronymic": query_match[0].patronymic,
                    "phone": query_match[0].phone,
                    "birthday": query_match[0].birthday,
                    "photo": query_match[0].photo,
                    "gender": query_match[0].gender,
                    "id": query_match[0].id,
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
