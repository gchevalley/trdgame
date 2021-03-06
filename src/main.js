import 'babel-polyfill';

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

//Vue.use(VueSocketio, socketio(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + namespace), store);
/*
Vue.use(VueSocketio, socketio(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + namespace, {
    transports: ["websocket", "polling"],
    upgrade: false
}), store);
*/
/*
Vue.use(VueSocketio, socketio('ws://' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + namespace, {
    transports: ["websocket", "polling"]
}), store);
*/
Vue.use(VueSocketio, socketio(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + namespace, {
    transports: ["websocket", "polling"]
}), store);

import VueRouter from 'vue-router';
import { routes } from './routes';
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('https://839fdde74061454ba7ba170271b8ed99@sentry.io/249323')
    .addPlugin(RavenVue, Vue)
    .install();

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
  router,
  render: h => h(App)
})
