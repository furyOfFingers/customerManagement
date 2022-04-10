from flask import request
from db.database import db_session
from models.student import Student
from cerberus import Validator
from termcolor import colored


def getStudent():
    if request.method == "GET":
        try:
            students = Student.query.all()
            correctDict = str(students).replace("'", '"')

            return correctDict

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
