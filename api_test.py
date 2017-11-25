import os
import unittest
import tempfile

import api #app

from flask import json, jsonify

class ApiTestCase(unittest.TestCase):
    def setUp(self):
        api.app.testing = True
        self.app = api.app.test_client("dev")
        with api.app.app_context():
            pass

    def tearDown(self):
        pass


    def test_server_time(self):
        response = self.app.get('/time')
        print( response.data.decode() )

    def test_mongo_host(self):
        response = self.app.get('/mongo/host')
        print( response.data.decode() )

    def test_spa(self):
        response = self.app.get('/')
        print( response.data.decode() )

    def test_client_connect(self):
        response = self.app.post('/connect', data=json.dumps( {'login': 'unit@test.py'} ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'game' in response_dict
        assert 'id' in response_dict['game']

    def test_oms_neworder(self):

        response_connect = self.app.post('/connect', data=json.dumps( {'login': 'unit@test.py'} ), content_type='application/json')
        response_connect_dict = json.loads(response_connect.data)

        assert 'game' in response_connect_dict
        assert 'id' in response_connect_dict['game']


        # buy market order
        newOrder = {'asset': "shares", 'side': "buy", 'qty': 500, 'orderprice': "MARKET", 'game_id': response_connect_dict['game']['id'] }

        response_neworder = self.app.post('/neworder', data=json.dumps( newOrder ), content_type='application/json')
        response_neworder_dict = json.loads(response_neworder.data)

        assert 'orderid' in response_neworder_dict
        assert 'ordertimestamp' in response_neworder_dict

        # sell market order
        newOrder = {'asset': "shares", 'side': "sell", 'qty': -100, 'orderprice': "MARKET", 'game_id': response_connect_dict['game']['id'] }

        response_neworder = self.app.post('/neworder', data=json.dumps( newOrder ), content_type='application/json')
        response_neworder_dict = json.loads(response_neworder.data)

        assert 'orderid' in response_neworder_dict

        # sell limit order
        newOrder = {'asset': "shares", 'side': "sell", 'qty': -100, 'orderprice': 800, 'game_id': response_connect_dict['game']['id'] }

        response_neworder = self.app.post('/neworder', data=json.dumps( newOrder ), content_type='application/json')
        response_neworder_dict = json.loads(response_neworder.data)

        assert 'orderid' in response_neworder_dict

    def test_survey_risks(self):

        # right
        response = self.app.post('/checksurvey/risks', data=json.dumps( {'shares': 0, 'prtcontext': {'shares': 0, 'cash': 10000000} } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] == 0
        assert response_dict['response']['adjustShares'] == 0


        # underestimate
        response = self.app.post('/checksurvey/risks', data=json.dumps( {'shares': 0, 'prtcontext': {'shares': 8000, 'cash': 10000000} } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] != 0
        assert response_dict['response']['adjustShares'] != 0


        # overestimate
        response = self.app.post('/checksurvey/risks', data=json.dumps( {'shares': 1000, 'prtcontext': {'shares': 0, 'cash': 10000000} } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] != 0
        assert response_dict['response']['adjustShares'] == 0

    def test_survey_derivatives(self):

        # refuse
        response = self.app.post('/checksurvey/derivatives', data=json.dumps( {'question2': 'no' } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] == 0
        assert response_dict['response']['adjustShares'] == 0


        # accept + right
        response = self.app.post('/checksurvey/derivatives', data=json.dumps( {'question2': 'yes', 'question3': 'response', 'question4': 'response', 'question5': 'response' } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] == 900000
        assert response_dict['response']['adjustShares'] == 0

        # accept + wrong
        response = self.app.post('/checksurvey/derivatives', data=json.dumps( {'question2': 'yes', 'question3': 'item1', 'question4': 'item2', 'question5': 'item3' } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] == -100000
        assert response_dict['response']['adjustShares'] == 0

        # accept + 1 mistake
        response = self.app.post('/checksurvey/derivatives', data=json.dumps( {'question2': 'yes', 'question3': 'response', 'question4': 'item1', 'question5': 'response' } ), content_type='application/json')
        response_dict = json.loads(response.data)

        assert 'response' in response_dict
        assert 'adjustCash' in response_dict['response']
        assert 'adjustShares' in response_dict['response']
        assert response_dict['response']['adjustCash'] == 900000
        assert response_dict['response']['adjustShares'] == 0



if __name__ == '__main__':
    unittest.main()
