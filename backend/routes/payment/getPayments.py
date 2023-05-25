from flask import request
from models.payment import Payment
from datetime import datetime


def get_date_time(date):
    return datetime.strptime(
        date, "%d.%m.%Y").date()


def getPayments():
    if request.method == "GET":
        data_from = request.args.get("from")
        data_to = request.args.get("to")

        try:
            ts_data_from = get_date_time(data_from)
            ts_data_to = get_date_time(data_to)

            query_match = Payment.query.all()
            filtered = []

            for payment in query_match:
                ts_payment_date = get_date_time(payment.payment_date)

                if (ts_payment_date <= ts_data_to and ts_payment_date >= ts_data_from):
                    filtered.append(payment)

            correctDict = str(filtered).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
