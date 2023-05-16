from flask import request
from db.database import db_session
from models.moneyReport import MoneyReport


def updateMoneyReportSettings():
    if request.method == "PUT":
        request_data = request.get_json()

        try:
            for id in request_data:
                query_match = MoneyReport.query.filter_by(id=id)

                if not query_match:
                    return {'updateMoneyReportSettings': {'id': 'money report settings not found'}}, 400
                else:
                    for money in request_data[id]:
                        if (money == 'subscription_payment'):
                            query_match[0].subscription_payment = request_data[id][money]
                        else:
                            query_match[0].teacher_salary = request_data[id][money]
                    db_session.commit()
            return "", 204

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
