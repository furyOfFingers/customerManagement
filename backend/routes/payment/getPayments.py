from flask import request
from models.payment import Payment


def getPayments():
    if request.method == "GET":
        try:
            query_obj = Payment.query.all()
            correctDict = str(query_obj).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
