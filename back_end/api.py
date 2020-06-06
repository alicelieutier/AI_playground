import flask
from flask import request, abort, jsonify
from flask_cors import CORS
import tictactoe

app = flask.Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
  return "<h1>AI API</h1><p>This site serves different game APIs.</p>"

@app.route('/api/v1/tictactoe', methods=['GET', 'POST'])
def api_all():
  if request.method == 'GET':
    return 'This route should be used with POST'

  move = tictactoe.next_move(request.json)
  return jsonify(move)

app.run()