from flask import request
from models.student import Student


def getStudents():
    if request.method == "GET":
        try:
            students = Student.query.order_by(Student.lastname).all()
            correctDict = str(students).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
