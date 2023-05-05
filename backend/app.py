import json
import os

from db.database import db_session, init_db
from flask import Flask, request
from models.user import User
from routes.auth import signin, signup
from routes.group import (createGroup, deleteGroup, getGroup, getGroups,
                          updateGroup)
from routes.payment import (createPayment, deletePayment, getPayment,
                            getPayments)
from routes.scheduleList import (createScheduleList, deleteScheduleList,
                                 getScheduleList, getScheduleLists,
                                 updateScheduleList)
from routes.student import (createStudent, deleteStudent, getStudent,
                            getStudents, updateStudent, uploadStudents)
from routes.teacher import (createTeacher, deleteTeacher, getTeacher,
                            getTeachers, updateTeacher)
from routes.visitList import getVisitList, setVisitList

app = Flask(__name__)
init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


@app.route('/api/users', methods=["GET"])
def get_users():
    if request.method == "GET":
        try:
            users = User.query.all()
            print('usersss', type(json.dumps(str(users))))
            return str(users)

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'


# auth
@app.route('/api/auth/signup', methods=["POST"])
def auth_signup():
    return signup.signup()


@app.route('/api/auth/signin', methods=["POST"])
def auth_signin():
    return signin.signin()


# student
@app.route('/api/student', methods=["POST"])
def student_create():
    return createStudent.createStudent()


@app.route('/api/student', methods=["GET"])
def student_getStudent():
    return getStudent.getStudent()


@app.route('/api/student', methods=["PUT"])
def student_update():
    return updateStudent.updateStudent()


@app.route('/api/student', methods=["DELETE"])
def student_delete():
    return deleteStudent.deleteStudent()


# students
@app.route('/api/students', methods=["GET"])
def student_getStudents():
    return getStudents.getStudents()


@app.route('/api/upload_students', methods=["POST"])
def student_uploadStudents():
    return uploadStudents.uploadStudents()


# teacher
@app.route('/api/teacher', methods=["POST"])
def teacher_create():
    return createTeacher.createTeacher()


@app.route('/api/teacher', methods=["GET"])
def teacher_getTeacher():
    return getTeacher.getTeacher()


@app.route('/api/teacher', methods=["PUT"])
def teacher_update():
    return updateTeacher.updateTeacher()


@app.route('/api/teacher', methods=["DELETE"])
def teacher_delete():
    return deleteTeacher.deleteTeacher()


# teachers
@app.route('/api/teachers', methods=["GET"])
def teacher_getTeachers():
    return getTeachers.getTeachers()


# group
@app.route('/api/group', methods=["POST"])
def group_create():
    return createGroup.createGroup()


@app.route('/api/group', methods=["GET"])
def group_getGroup():
    return getGroup.getGroup()


@app.route('/api/group', methods=["PUT"])
def group_update():
    return updateGroup.updateGroup()


@app.route('/api/group', methods=["DELETE"])
def group_delete():
    return deleteGroup.deleteGroup()


# groups
@app.route('/api/groups', methods=["GET"])
def group_getGroups():
    return getGroups.getGroups()


# schedule_list
@app.route('/api/scheduleList', methods=["POST"])
def schedule_list_create():
    return createScheduleList.createScheduleList()


@app.route('/api/scheduleList', methods=["GET"])
def schedule_list_getSchedule_list():
    return getScheduleList.getScheduleList()


@app.route('/api/scheduleList', methods=["PUT"])
def schedule_list_update():
    return updateScheduleList.updateScheduleList()


@app.route('/api/scheduleList', methods=["DELETE"])
def schedule_list_delete():
    return deleteScheduleList.deleteScheduleList()


# schedule_lists
@app.route('/api/scheduleLists', methods=["GET"])
def schedule_list_getSchedule_lists():
    return getScheduleLists.getScheduleLists()


# payment
@app.route('/api/payment', methods=["POST"])
def payment_create():
    return createPayment.createPayment()


@app.route('/api/payment', methods=["GET"])
def payment_get():
    return getPayment.getPayment()


@app.route('/api/payment', methods=["DELETE"])
def payment_delete():
    return deletePayment.deletePayment()


# payments
@app.route('/api/payments', methods=["GET"])
def payment_get_all():
    return getPayments.getPayments()


# visitList
@app.route('/api/visitList', methods=["GET"])
def visit_list_get():
    return getVisitList.getVisitList()


@app.route('/api/visitList', methods=["PUT"])
def visit_list_set():
    return setVisitList.setVisitList()


if __name__ == '__main__':
    config_path = os.path.dirname(os.path.realpath(__file__))
    config = open(config_path+'/config.json')
    data = json.load(config)
    SERVER_HOST = data['SERVER_HOST']
    SERVER_PORT = data['SERVER_PORT']

    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
