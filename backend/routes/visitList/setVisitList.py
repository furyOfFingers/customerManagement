from flask import request
from models.visitList import VisitList
from db.database import db_session
import json


def setVisitList():
    if request.method == "PUT":
        request_data = request.get_json()
        group_id = list(request_data.keys())[0]
        year = list(request_data[group_id].keys())[0]
        month = list(request_data[group_id][year].keys())[0]
        student_days = request_data[group_id][year][month]
        id = f"{group_id}-{year}-{month}"

        try:
            for student_id, days in student_days.items():
                actualDays = {}

                for key, value in days.items():
                    if value != '.':
                        actualDays[key] = value

                days_json = json.dumps(actualDays)
                visitList = VisitList(id=f"{id}-{student_id}", days=days_json)
                db_session.merge(visitList)

            db_session.flush()
            db_session.commit()

            return {"student_days": str(student_days).replace('\\', '')}, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
