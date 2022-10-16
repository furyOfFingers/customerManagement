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
                    "payment_amount": query_match[0].payment_amount,
                    "type": query_match[0].type,
                    "payer_id": query_match[0].payer_id,
                    "method": query_match[0].method,
                    "teacher_id": query_match[0].teacher_id,
                    "group_id": query_match[0].group_id,
                    "id": query_match[0].id,
                    "payment_date": query_match[0].payment_date
                }, 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
