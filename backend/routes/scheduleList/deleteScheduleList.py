from db.database import db_session
from flask import request
from models.scheduleList import ScheduleList


def deleteScheduleList():
    if request.method == "DELETE":
        id = request.args.get("id")

        try:
            query_match = ScheduleList.query.filter_by(id=id).all()

            if not query_match:
                return {'remove': {'id': 'schedule_list not found'}}, 400
            else:
                removed_schedule_list = query_match[0]
                schedule_list_name = removed_schedule_list.schedule_list_name

                ScheduleList.query.filter_by(id=id).delete()
                db_session.flush()
                db_session.commit()
                return "schedule list {} has been removed.".format(schedule_list_name), 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
