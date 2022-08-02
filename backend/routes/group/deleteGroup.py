from db.database import db_session
from flask import request
from models.group import Group


def deleteGroup():
    if request.method == "DELETE":
        id = request.args.get("id")

        try:
            query_match = Group.query.filter_by(id=id).all()

            if not query_match:
                return {'remove': {'id': 'group not found'}}, 400
            else:
                removed_group = query_match[0]
                group_name = removed_group.group_name

                Group.query.filter_by(id=id).delete()
                db_session.flush()
                db_session.commit()
                return "group {} has been removed.".format(group_name), 200

        except Exception as e:
            db_session.rollback()
            return str(e), 400
    else:
        return "wrong method"
