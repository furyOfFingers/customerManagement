from db.database import db_session
from flask import request
from models.payment import Payment


def deletePayment():
    if request.method == "DELETE":
        id = request.args.get("id")

        try:
            query_match = Payment.query.filter_by(id=id).all()

            if not query_match:
                return {'remove': {'id': 'payment not found'}}, 400
            else:
                removed_obj = query_match[0]
                date = removed_obj.date
                method = removed_obj.method
                payment_amount = removed_obj.payment_amount

                Payment.query.filter_by(id=id).delete()
                db_session.flush()
                db_session.commit()
                return "payment with date - {} method - {} and amount -{}. has been removed.".format(date,
                                                                                                     method,
                                                                                                     payment_amount), 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
