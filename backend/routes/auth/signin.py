import time
from flask import request, jsonify


def signin():
    time.sleep(3)
    return jsonify(request.get_json())
