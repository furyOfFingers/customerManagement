from cerberus import Validator
from db.database import db_session
from flask import request
from models.moneyReport import MoneyReport


def createMoneyReportSettings():
    if request.method == "POST":
        request_data = request.get_json()
        v = Validator()
        schema = {
            'value': {
                'type': 'string', 'minlength': 1, 'maxlength': 50
            },
            'label': {
                'type': 'string', 'minlength': 1, 'maxlength': 50
            },
            'hint': {
                'type': 'string', 'minlength': 1, 'maxlength': 100
            },
            'teacher_salary': {
                'type': 'string', 'minlength': 1, 'maxlength': 10
            },
            'subscription_payment': {
                'type': 'string', 'minlength': 1, 'maxlength': 10
            },
        }

        if not v.validate(request_data, schema):
            return v.errors, 400
        else:
            value = request_data['value']
            label = request_data['label']
            hint = request_data['hint']
            teacher_salary = request_data['teacher_salary']
            subscription_payment = request_data['subscription_payment']

            new_student = MoneyReport(
                value=value,
                label=label,
                hint=hint,
                teacher_salary=teacher_salary,
                subscription_payment=subscription_payment,
            )

            try:
                db_session.add(new_student)
                db_session.flush()
                db_session.commit()

                return {
                    "value": value,
                    "label": label,
                    "hint": hint,
                    "teacher_salary": teacher_salary,
                    "subscription_payment": subscription_payment,
                }, 201

            except Exception as e:
                db_session.rollback()
                return str(e), 400
    else:
        return "wrong method"
