from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, disconnect
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo

from threading import Lock
import json
import random
import datetime
import pandas as pd
from time import sleep


app = Flask(__name__)
CORS(app)
mongo = PyMongo(app)

# https://www.shanelynn.ie/asynchronous-updates-to-a-webpage-with-flask-and-socket-io/
# https://github.com/miguelgrinberg/Flask-SocketIO

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None
socketio = SocketIO(app, async_mode=async_mode)

thread = None
thread_lock = Lock()


def background_thread():
    """Example of how to send server generated events to clients."""
    df = pd.read_csv('static/ts/IBM.csv')
    dfList = df['Adj Close'].tolist()
    while True:
        for number in dfList:
            socketio.sleep(random.randint(1,5))
            #number = random.randint(1,101)
            socketio.emit('my_response',
                          {'number': round(number / (round(dfList[0],2)/100.0), 2)},
                          namespace='/test')

@app.route('/time')
def server_time():
    return datetime.datetime.now().isoformat()

@app.route('/random')
def random_gen():
    return render_template('random.html', async_mode=socketio.async_mode)


@app.route('/')
def spa():
    return render_template('index.html', async_mode=socketio.async_mode)

@app.route('/connect', methods=['POST'])
@cross_origin(origin='*')
def connect():
    content = request.json

    data = {}
    data['player'] = {
        'name': content['login'],
        'ranking': '-',
        'omsOption': False,
        'textTrader': False
    }

    data['portfolio'] = {
        'amountCash': 10000000,
        'positions': {
            'shares' : 0,
            'derivatives': []
        }
    }

    data['game'] = {
        'currentRound': 9,
    }

    data['pendingOrders'] = []
    data['executedOrders'] = []

    return jsonify(data)

@app.route('/neworder', methods=['POST'])
@cross_origin(origin='*')
def new_order():
    dict = request.json
    dict['timestamp'] = server_time()
    print('neworder !')
    print(json.dumps(dict))
    posts = mongo.db.posts
    #post_id = posts.insert_one(dict).inserted_id
    #print(post_id)
    print(posts.count())
    return jsonify('ok')


@socketio.on('my_ping', namespace='/test')
def ping_pong():
    emit('my_pong')

@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(target=background_thread)
    emit('my_connection', {'data': 'Connected'})



@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
