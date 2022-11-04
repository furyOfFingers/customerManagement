import base64

from db.database import db_session
from flask import request
from models.student import Student


def uploadStudents():
    if request.method == "POST":
        text = request.get_data().decode()[23:]
        if (text != '//4='):
            decodedBytes = base64.b64decode(text)
            decodedStr = str(decodedBytes, "utf-16")
            student_count = len(decodedStr.splitlines())
            ending = 'students' if student_count > 1 else 'student'

            for line in decodedStr.splitlines():
                list_element = line.split(' ')

                new_student = Student(
                    lastname=list_element[0],
                    firstname=list_element[1],
                    patronymic=list_element[2],
                    phone=list_element[3],
                    birthday=list_element[4],
                    gender=list_element[5],
                    photo='',
                    teachers=''
                )
                db_session.add(new_student)
            try:
                db_session.flush()
                db_session.commit()
                return "{} {} have been added.".format(student_count, ending), 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
        else:
            return 'file empty', 400
    else:
        return "wrong method", 405
