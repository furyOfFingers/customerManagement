import json
import os

from flask import Flask, request

from db.database import db_session, init_db
from models.user import User
from routes.auth import signin, signup
from routes.student import createStudent, deleteStudent, getStudent, getStudents, updateStudent
from routes.teacher import createTeacher, deleteTeacher, getTeacher, getTeachers, updateTeacher

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


@app.route('/api/students', methods=["GET"])
def student_getStudents():
    return getStudents.getStudents()


@app.route('/api/student', methods=["PUT"])
def student_update():
    return updateStudent.updateStudent()


@app.route('/api/student', methods=["DELETE"])
def student_delete():
    return deleteStudent.deleteStudent()


# teacher
@app.route('/api/teacher', methods=["POST"])
def teacher_create():
    return createTeacher.createTeacher()


@app.route('/api/teacher', methods=["GET"])
def teacher_getTeacher():
    return getTeacher.getTeacher()


@app.route('/api/teachers', methods=["GET"])
def teacher_getTeachers():
    return getTeachers.getTeachers()


@app.route('/api/teacher', methods=["PUT"])
def teacher_update():
    return updateTeacher.updateTeacher()


@app.route('/api/teacher', methods=["DELETE"])
def teacher_delete():
    return deleteTeacher.deleteTeacher()


if __name__ == '__main__':
    config_path = os.path.dirname(os.path.realpath(__file__))
    config = open(config_path+'/config.json')
    data = json.load(config)
    SERVER_HOST = data['SERVER_HOST']
    SERVER_PORT = data['SERVER_PORT']

    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
