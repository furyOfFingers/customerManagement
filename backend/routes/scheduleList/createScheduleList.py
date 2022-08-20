from cerberus import Validator
from db.database import db_session
from flask import request

from models.scheduleList import ScheduleList


def createScheduleList():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        v.require_all = True
        schema = {
            'schedule_list_name': {
                'type': 'string', 'minlength': 2, 'maxlength': 40
            },
            'schedule': {
                'type': 'string'
            }
        }
        if 'schedule' in request_data:
            schedule_string = str(request_data['schedule'])
            request_data['schedule'] = schedule_string

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            schedule_list_name = request_data['schedule_list_name']
            schedule = request_data['schedule']

            new_group = ScheduleList(
                schedule_list_name=schedule_list_name,
                schedule=schedule,
            )
            try:
                db_session.add(new_group)
                db_session.flush()
                db_session.commit()
                return {
                    "schedule_list_name": schedule_list_name,
                    "schedule": schedule,
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
