import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import {store} from './store/store.js';

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'
Vue.use(VueSocketio, socketio('http://localhost:5000/test'), store);

import moment from 'moment';
Vue.prototype.$moment = moment;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
