from flask import request
from db.database import db_session
from models.group import Group


def updateGroup():
    if request.method == "PUT":
        request_data = request.get_json()
        id = request_data['id']

        try:
            query_match = Group.query.filter_by(id=id).all()

            if not query_match:
                return {'updateGroup': {'id': 'group not found'}}, 400
            else:
                update_group = query_match[0]

                students_string = ','.join(request_data['students'])
                update_group.students = students_string

                class_date_string = ','.join(request_data['class_date'])
                update_group.class_date = class_date_string

                update_group.group_name = request_data['group_name']
                update_group.teacher = request_data['teacher']
                update_group.students = students_string
                update_group.class_date = class_date_string

                db_session.commit()
                return "", 204

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
