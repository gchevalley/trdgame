import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'

import moment from 'moment';
Vue.prototype.$moment = moment;

import chartist from 'chartist';
Vue.prototype.$chartist = chartist;

new Vue({
  el: '#app',
  moment,
  render: h => h(App)
})
