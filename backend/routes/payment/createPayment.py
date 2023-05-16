from cerberus import Validator
from db.database import db_session
from flask import request
from models.payment import Payment
from models.moneyReport import MoneyReport


def createPayment():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        query_obj = MoneyReport.query.all()

        arr_type = []

        for report in query_obj:
            arr_type.append(report.value)

        schema = {
            'payment_date': {
                'type': 'string', 'minlength': 1, 'maxlength': 40
            },
            'payment_amount': {
                'type': 'string', 'minlength': 1, 'maxlength': 80
            },
            'type': {
                'type': 'string', 'allowed': arr_type
            },
            'payer_id': {
                'type': 'string', 'minlength': 1, 'maxlength': 30
            },
            'method': {
                'type': 'string', 'allowed': ['cash', 'card']
            },
            'teacher_id': {
                'type': 'string', 'required': False, 'minlength': 1, 'maxlength': 30
            },
            'group_id': {
                'type': 'string', 'required': False, 'minlength': 1, 'maxlength': 30
            },

        }

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            payment_date = request_data['payment_date']
            payment_amount = request_data['payment_amount']
            type = request_data['type']
            payer_id = request_data['payer_id']
            method = request_data['method']
            teacher_id = request_data['teacher_id']
            group_id = request_data['group_id']

            new_student = Payment(
                payment_date=payment_date,
                payment_amount=payment_amount,
                type=type,
                payer_id=payer_id,
                method=method,
                teacher_id=teacher_id,
                group_id=group_id,
            )
            try:
                db_session.add(new_student)
                db_session.flush()
                db_session.commit()
                return {
                    "id": new_student.id,
                    "payment_date": new_student.payment_date,
                    "payment_amount": payment_amount,
                    "type": type,
                    "payer_id": payer_id,
                    "method": method,
                    "teacher_id": teacher_id,
                    "group_id": group_id,
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
