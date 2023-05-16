from flask import request
from models.moneyReport import MoneyReport


def getMoneyReportSettings():
    if request.method == "GET":
        try:
            query_obj = MoneyReport.query.all()
            correctDict = str(query_obj).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
