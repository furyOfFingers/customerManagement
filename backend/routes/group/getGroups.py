from flask import request
from models.group import Group


def getGroups():
    if request.method == "GET":
        try:
            groups = Group.query.all()
            correctDict = str(groups).replace("'", '"')

            return correctDict, 200

        except Exception as e:
            return str(e)
    else:
        return 'wrong method'
