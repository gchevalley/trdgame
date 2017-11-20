from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, disconnect
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo

import os
from threading import Lock
import json
import random
import datetime
import pandas as pd
from time import sleep

import copy


app = Flask(__name__)

app.config['MONGO_HOST'] = os.getenv('MONGO_HOST', 'localhost') # dev localhost, prod docker



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

players = {}


# https://fangpenlin.com/posts/2012/08/26/good-logging-practice-in-python/
import logging
logging.basicConfig(level=logging.INFO)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def background_thread():
    """Example of how to send server generated events to clients."""
    df = pd.read_csv('static/ts/IBM.csv')
    df = df.fillna(-1)
    prices = df['Adj Close'].tolist()
    times = df['Metronome'].tolist()
    surveys = df['Survey'].tolist()
    disturbances = df['Disturbance'].tolist()
    news_title = df['NewsTitle'].tolist()
    news_details = df['NewsDetails'].tolist()
    new_category = df['NewsCategory'].tolist()
    news_timeout = df['NewsTimeout'].tolist()

    while True: # infinite loop
        for idx in range(len(prices)):
            socketio.sleep( times[idx] )
            #number = random.randint(1,101)
            socket_reponse = {'tstimestamp': server_time(), 'idx': idx, 'number': round( prices[idx] / (round( prices[0],2) / 100.0), 2) }

            if surveys[idx] != -1:
                logger.info('Found survey in timeserie: ' + json.dumps(surveys[idx]) )
                socket_reponse['survey'] = surveys[idx]
            if disturbances[idx] != -1:
                logger.info('Found disturbance in timeserie: ' + json.dumps(disturbances[idx]) )
                socket_reponse['disturbance'] = disturbances[idx]
            if news_title[idx] != -1:
                logger.info('Found news in timeserie: ' + json.dumps(news_title[idx]) )
                socket_reponse['news'] = {'title': news_title[idx],
                'details': news_details[idx],
                'category': new_category[idx],
                'timeout': news_timeout[idx]
                }

            scoreboard = {}
            for player in players:
                scoreboard[player] = players[player]['shares']

            sorted_score = []
            for key, value in sorted(scoreboard.items(), key=lambda item: (item[1], item[0])):
                if value != 0:
                    sorted_score.append(key)

            sorted_score = sorted_score [::-1]
            if len(sorted_score) > 0:
                socket_reponse['scoreboard'] = sorted_score
                socket_reponse['numberPlayers'] = len(sorted_score)

            with app.app_context():
                mongo.db.ts.insert_one( copy.deepcopy(socket_reponse) )

            logging.info("emit price update: " + json.dumps(socket_reponse) )
            socketio.emit('my_response',
                          socket_reponse,
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

@app.route('/reset', methods=['GET'])
def reset_thread():
    global thread
    thread = None
    return 'reset thread'

@app.route('/connect', methods=['POST'])
@cross_origin(origins='*')
def connect():
    content = request.json

    data = {}
    data['server'] = {
        'datetime': server_time()
    }

    data['player'] = {
        'name': content['login'],
        'ranking': '-',
        'rankingPrev': '-',
        'rankingChg': '-',
        'omsOption': False,
        'textTrader': False
    }

    data['portfolio'] = {
        'amountCash': 10000000,
        'OrgAmountCash': 10000000,
        'positions': {
            'shares' : 0,
            'derivatives': []
        }
    }

    data['game'] = {
        'currentRound': 0,
        'numberPlayers': 1,
        'gameOver': False,
        'limitShortShares': -20000,
        'qtyLimitOrder': 10000,
    }

    data['pendingOrders'] = []
    data['executedOrders'] = []

    data['game']['id'] = str(mongo.db.players_games.insert_one( copy.deepcopy(data) ).inserted_id)

    logger.info('New connection from client: ' + json.dumps(data) )

    return jsonify(data)

@app.route('/neworder', methods=['POST'])
@cross_origin(origins='*')
def new_order():
    order = request.json

    order['ordertimestamp'] = server_time()

    order['orderid'] = str( mongo.db.orders.insert_one( copy.deepcopy(order) ).inserted_id )

    logger.info('New order: ' + json.dumps(order) )

    return jsonify(order)


@app.route('/newexecution', methods=['POST'])
@cross_origin(origins='*')
def new_execution():
    execution = request.json

    execution['exectimestamp'] = server_time()
    execution['execid'] = str( mongo.db.executions.insert_one( copy.deepcopy(execution) ).inserted_id )

    logger.info('New execution: ' + json.dumps(execution) )

    return jsonify(execution)

@app.route('/checksurvey/<survey>', methods=['POST'])
@cross_origin(origins='*')
def check_survey(survey):

    logger.info('New survey submitted: ' + json.dumps(request.json) )

    cSurvey = {}
    cSurvey['name'] = survey
    cSurvey['submittedContent'] = request.json
    cSurvey['surveycompletetimestamp'] = server_time()

    if survey == 'risks':
        cSurvey['response'] = check_survey_risks(request.json)
    elif survey == 'derivatives':
        cSurvey['response'] = check_survey_derivatives(request.json)

    cSurvey['surveyid'] = str( mongo.db.surveys.insert_one( copy.deepcopy(cSurvey) ).inserted_id )

    return jsonify(cSurvey)

def check_survey_risks(response_json):
    subShares = float(response_json['shares'])
    curShares = response_json['prtcontext']['shares']
    curCash = response_json['prtcontext']['cash']
    dictResponse = {}
    if (abs(subShares) < 0.9 * abs(curShares) ):
        dictResponse['message'] = "You massively underestimate your current risk"
        dictResponse['adjustCash'] = -round(0.10 * curCash, 0)
        if curShares>=0:
            dictResponse['adjustShares'] = -(curShares-subShares)
        else:
            dictResponse['adjustShares'] = (curShares-subShares)
    elif abs(subShares) > 1.1 * abs(curShares):
        dictResponse['message'] = "You massively overestimate your current risk"
        dictResponse['adjustCash'] = -round(0.10 * curCash, 0)
        dictResponse['adjustShares'] = 0
    else:
        dictResponse['message'] = "Perfect !"
        dictResponse['adjustCash'] = 0
        dictResponse['adjustShares'] = 0

    return dictResponse

def check_survey_derivatives(response_json):

    logger.info('survey derivatives, input: ' + json.dumps(response_json) )
    dictResponse = {}

    dictResponse['message'] = ''
    if response_json['question2'] == 'yes':
        dictResponse['adjustCash'] = -100000

        count_error = 0
        for question, answer in response_json.items():
            if question[:8] == 'question':
                if question != 'question2':
                    if answer != 'response':
                        count_error += 1

        logger.info('survey derivatives: ' + str(count_error))
        if count_error <= 1:
            dictResponse['adjustCash'] += 1000000

    else:
        dictResponse['adjustCash'] = 0
    dictResponse['adjustShares'] = 0

    return dictResponse


@socketio.on('my_ping', namespace='/test')
def ping_pong():
    emit('my_pong')

@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    with thread_lock:
        if thread is None:
            logger.info('Start TS thread')
            thread = socketio.start_background_task(target=background_thread)
    emit('my_connection', {'data': 'Connected'})

@socketio.on('score', namespace='/test')
def update_score(score):
    global players
    #logger.info('update score: ' + json.dumps(score) )

    if 'player' in score:
        if score['player'] in players:
            pass
        else:
            players[ score['player'] ] = {
                'player': score['player'],
                'game': score['player']
            }

        players[ score['player'] ]['timestamp'] = datetime.datetime.now()
        if 'shares' in score:
            players[ score['player'] ]['shares'] = score['shares']
        else:
            players[ score['player'] ]['shares'] = 0
        if 'pnl' in score:
            players[ score['player'] ]['pnl'] = score['pnl']
        else:
            players[ score['player'] ]['pnl'] = 0
        if 'cash' in score:
            players[ score['player'] ]['cash'] = score['cash']
        else:
            players[ score['player'] ]['cash'] = 0

    # wash old
    need_to_del_players = []
    for player in players:
        if players[player]['timestamp'] < datetime.datetime.now() - datetime.timedelta(seconds=10):
            need_to_del_players.append(player)
    if len(need_to_del_players) > 0:
        for player in need_to_del_players:
            del players[player]

    logger.info('players: ' + str(len(players)) )


@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    logger.info('Client disconnected: ' + request.sid)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
    #socketio.run(app, host='0.0.0.0', debug=False)
