import flask
from flask import request
import tictactoe

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
  return "<h1>AI API</h1><p>This site serves different game APIs.</p>"

@app.route('/api/v1/tictactoe', methods=['GET', 'POST'])
def api_all():
  if request.method == 'GET':
    return 'This route should be used with POST'
  content = request.json
  return tictactoe.next_move(content)

app.run()