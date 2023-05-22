from cerberus import Validator
from db.database import db_session
from flask import request

from models.group import Group


def createGroup():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        v.require_all = True
        schema = {
            'group_name': {
                'type': 'string', 'minlength': 2, 'maxlength': 40
            },
            'teacher': {
                'type': 'string'
            },
            'students': {
                'type': 'string'
            },
            'class_date': {
                'type': 'string'
            }
        }

        if 'students' in request_data:
            students_string = ','.join(request_data['students'])
            request_data['students'] = students_string

        if 'class_date' in request_data:
            request_data['class_date'] = request_data['class_date']

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            group_name = request_data['group_name']
            teacher = request_data['teacher']
            students = request_data['students']
            class_date = request_data['class_date']

            new_group = Group(
                group_name=group_name,
                teacher=teacher,
                students=students,
                class_date=class_date,
            )
            try:
                db_session.add(new_group)
                db_session.flush()
                db_session.commit()
                return {
                    "group_name": group_name,
                    "teacher": teacher,
                    "students": students,
                    "class_date": class_date,
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
