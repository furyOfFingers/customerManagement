from cerberus import Validator
from db.database import db_session
from flask import request
from models.payment import Payment


def createPayment():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        arr_type = ["commercial rent",
                    "non commercial rent",
                    "trial",
                    "1",
                    "4",
                    "8",
                    "16",
                    "individual",
                    "pause", ]
        # v.require_all = True
        schema = {
            'date': {
                'type': 'string', 'minlength': 2, 'maxlength': 40
            },
            'payment_amount': {
                'type': 'string', 'minlength': 1, 'maxlength': 80
            },
            'type': {
                'type': 'string', 'allowed': arr_type
            },
            'payerId': {
                'type': 'string', 'minlength': 1, 'maxlength': 30
            },
            'method': {
                'type': 'string', 'allowed': ['cash', 'card']
            },
            'teacherId': {
                'type': 'string', 'required': False, 'minlength': 1, 'maxlength': 30
            },
            'groupId': {
                'type': 'string', 'required': False, 'minlength': 1, 'maxlength': 30
            },

        }

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            date = request_data['date']
            payment_amount = request_data['payment_amount']
            type = request_data['type']
            payerId = request_data['payerId']
            method = request_data['method']
            teacherId = request_data['teacherId']
            groupId = request_data['groupId']

            new_student = Payment(
                date=date,
                payment_amount=payment_amount,
                type=type,
                payerId=payerId,
                method=method,
                teacherId=teacherId,
                groupId=groupId,
            )
            try:
                db_session.add(new_student)
                db_session.flush()
                db_session.commit()
                return {
                    "id": new_student.id,
                    "date_created": new_student.date_created,
                    "date": date,
                    "payment_amount": payment_amount,
                    "type": type,
                    "payerId": payerId,
                    "method": method,
                    "teacherId": teacherId,
                    "groupId": groupId,
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
