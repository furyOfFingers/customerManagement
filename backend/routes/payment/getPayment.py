from flask import request
from db.database import db_session
from models.payment import Payment


def getPayment():
    if request.method == "GET":
        id = request.args.get("id")

        try:
            query_match = Payment.query.filter_by(id=id).all()

            if not query_match:
                return {'getPayment': {'id': 'payment not found'}}, 400
            else:
                return {
                    "date": query_match[0].date,
                    "payment_amount": query_match[0].payment_amount,
                    "type": query_match[0].type,
                    "payerId": query_match[0].payerId,
                    "method": query_match[0].method,
                    "teacherId": query_match[0].teacherId,
                    "groupId": query_match[0].groupId,
                    "id": query_match[0].id,
                    "date_created": query_match[0].date_created
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
