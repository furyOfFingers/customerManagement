from flask import request
from db.database import db_session
from models.group import Group


def getGroup():
    if request.method == "GET":
        id = request.args.get("id")

        try:
            query_match = Group.query.filter_by(id=id).all()

            if not query_match:
                return {'getGroup': {'id': 'group not found'}}, 400
            else:
                return {
                    "group_name": query_match[0].group_name,
                    "teacher": query_match[0].teacher,
                    "students": query_match[0].students,
                    "class_date": query_match[0].class_date,
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
