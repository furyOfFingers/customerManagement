from flask import request
from models.visitList import VisitList
from db.database import db_session
import json


def getVisitList():
    if request.method == "GET":
        group_id = request.args.get("groupId")
        year = request.args.get("year")
        month = request.args.get("month")

        try:
            id_pattern = f"{group_id}-{year}-{month}-"

            visitList = VisitList.query.filter(
                VisitList.id.like(f"{id_pattern}%")).all()
            days = {}
            for day in visitList:
                last_dash_index = day.id.rfind("-")
                id = day.id[last_dash_index+1:]

                days[id] = json.loads(day.days)

            if len(visitList) == 0:
                return {}, 200
            else:
                return {
                    group_id: {
                        year: {
                            month: days
                        }
                    }
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
