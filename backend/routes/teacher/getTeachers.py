from flask import request
from models.teacher import Teacher


def getTeachers():
    if request.method == "GET":
        try:
            teachers = Teacher.query.order_by(Teacher.lastname).all()
            correctDict = str(teachers).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
