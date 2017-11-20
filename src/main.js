import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';

import {store} from './store/store.js';

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'
var namespace = '/test';
//Vue.use(VueSocketio, socketio(location.protocol + '//' + document.domain + ':' + location.port + namespace), store);
Vue.use(VueSocketio, socketio(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + namespace), store);

import moment from 'moment';
Vue.prototype.$moment = moment;

import {flexNumber, flexCurrency} from './filters/filters.js';
Vue.filter('flexNumber', flexNumber);
Vue.filter('flexCurrency', flexCurrency);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import Survey from 'survey-vue';
Vue.prototype.$Survey = Survey;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
