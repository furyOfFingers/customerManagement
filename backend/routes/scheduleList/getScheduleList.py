from flask import request
from db.database import db_session
from models.scheduleList import ScheduleList


def getScheduleList():
    if request.method == "GET":
        id = request.args.get("id")

        try:
            query_match = ScheduleList.query.filter_by(id=id).all()

            if not query_match:
                return {'getScheduleList': {'id': 'group not found'}}, 400
            else:
                return {
                    "schedule_list_name": query_match[0].schedule_list_name,
                    "schedule": query_match[0].schedule,
                    "date_created": query_match[0].date_created,
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
