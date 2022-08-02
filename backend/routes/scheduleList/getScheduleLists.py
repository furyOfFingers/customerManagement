from flask import request
from models.scheduleList import ScheduleList


def getScheduleLists():
    if request.method == "GET":
        try:
            query = ScheduleList.query.all()
            correctDict = str(query).replace("'", '"')
            # print('--->getScheduleLists', correctDict)
            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
