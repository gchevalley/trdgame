import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';

import moment from 'moment';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

    connected: false,

    player: {
    },

    game: {
    },

    stockprice: [],

    portfolio: {
    },

    pendingOrders: [],
    executedOrders: [
    ],

  },

  getters: {
    countOrders: state => {
      return state.pendingOrders.length;
    },
    last_price: state => {
      return state.stockprice[state.stockprice.length - 1];
    },
    stockprices: state => {
      return state.stockprice;
    }
  },

  mutations: {
    login_player: (state, payLoad) => {
      state.player = payLoad;
    },

    login_game: (state, payLoad) => {
      state.game = payLoad;
    },

    login_portfolio: (state, payLoad) => {
      state.portfolio = payLoad;
    },

    login_executedOrders: (state, payLoad) => {
      state.executedOrders = payLoad;
    },

    login_connect: (state) => {
      state.connected = true;
    },

    insertNewPriceInMarket: (state, payLoad = -1) => {
      if (payLoad == -1) {
        var newPrice = Math.floor(Math.random() * 23) + 1;
      } else {
        var newPrice = payLoad;
      }

      if (state.stockprice.length >= 10) {
        state.stockprice.shift();
      }

      state.stockprice.push(newPrice);
    },

    insertNewOrder: (state, payLoad) => {
      state.pendingOrders = [payLoad].concat( state.pendingOrders );
    },

    removeOrder: (state, payLoad) => {
      state.pendingOrders = state.pendingOrders.filter(order => order.id != payLoad.id);
    },

    insertNewExec: (state, payLoad) => {
      state.portfolio.amountCash += -payLoad.qty * payLoad.execprice;
      state.portfolio.positions.shares += payLoad.qty;
      state.executedOrders = [payLoad].concat( state.executedOrders );
    },

    adjustCash: (state, payLoad) => {
      state.portfolio.amountCash += payLoad;
    },

    adjustShares: (state, payLoad) => {
      state.portfolio.positions.shares += payLoad;
    }
  },

  actions: {
    login: ({commit, getters}, payLoad) => {
      //console.log(payLoad);
      commit('login_player', payLoad.player);
      commit('login_game', payLoad.game);
      commit('login_portfolio', payLoad.portfolio);
      commit('login_executedOrders', payLoad.executedOrders);

      commit('login_connect');
    },

    updateMarket: ({commit, getters}) => {
      var previousPrice = getters.last_price;
      commit('insertNewPriceInMarket')
      var newPrice = getters.last_price;

      //console.log(previousPrice + ' ' + newPrice);

    },

    newOrder: ({commit, getters}, payLoad) => {
      if (payLoad.orderprice != '') {
        payLoad.ordertype = "LMT"
      } else {
        payLoad.ordertype = "MKT"
        payLoad.orderprice = 'MARKET';
      }
      payLoad.id = getters.countOrders + 1;
      commit( 'insertNewOrder', payLoad );
    },

    CancelOrder: ({commit}, payLoad) => {
      commit( 'removeOrder', payLoad );
    },

    socket_myResponse: (context, message) => {
      //console.log("capture update price directly from store");
      //console.log(message);
      var newPrice = message.number;

      // execute market orders
      context.state.pendingOrders.forEach(function(order) {
        if (order.ordertype == 'MKT') {
          order.orderprice = newPrice;
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");
          context.commit( 'insertNewExec', order );
          context.commit( 'removeOrder', order );
        } else if ( (order.ordertype == 'LMT' && order.side == 'buy' && order.orderprice >= newPrice) || (order.ordertype == 'LMT' && order.side == 'sell' && order.orderprice <= newPrice) ) {
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");
          context.commit( 'insertNewExec', order );
          context.commit( 'removeOrder', order );
        }
      });
      /*
      Vue.http.post(location.protocol + '//' + document.domain + ':' + '5000/neworder', {id: 4}).then(response => {
        console.log(response);
        }, error => {
          console.log(response);
        });
      */
      context.commit('insertNewPriceInMarket', newPrice);
    },
  }
});
