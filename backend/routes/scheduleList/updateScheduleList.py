from flask import request
from db.database import db_session
from models.scheduleList import ScheduleList


def updateScheduleList():
    if request.method == "PUT":
        request_data = request.get_json()
        id = request_data['id']

        try:
            query_match = ScheduleList.query.filter_by(id=id).all()

            if not query_match:
                return {'updateScheduleList': {'id': 'scheduleList not found'}}, 400
            else:
                update_query = query_match[0]

                schedule_string = ','.join(request_data['schedule'])
                update_query.schedule = schedule_string

                update_query.schedule_list_name = request_data['schedule_list_name']
                update_query.schedule = schedule_string

                db_session.commit()
                return "", 204

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
