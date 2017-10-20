import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import {store} from './store/store.js';

import moment from 'moment';
Vue.prototype.$moment = moment;

import chartist from 'chartist';
Vue.prototype.$chartist = chartist;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
