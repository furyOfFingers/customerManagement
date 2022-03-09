from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/auth/signup', methods=["POST"])
def auth_signup():
    return jsonify(request.get_json())


@app.route('/api/auth/signin', methods=["POST"])
def auth_signin():
    # print('request.get_json()', request.get_json())
    # print('json.loads(request.data)', json.loads(request.data))
    # print('data', request.data)
    return jsonify(request.get_json())


if __name__ == '__main__':
    app.run(debug=True)
