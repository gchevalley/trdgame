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
    showModal: false,
    surveys: [{
      completed: false,
      name: 'risks',
      submittedContent: {},
      response: {},
    }],

    player: {
    },

    game: {
      limitShortShares: -20000
    },

    stockprice: [],

    portfolio: {
      positions: {
        shares: 0
      }
    },

    countOrder: 0,
    pendingOrders: [],
    executedOrders: [
    ],

  },

  getters: {
    gameId: state => {
      return state.game.id;
    },
    orderId: state => {
      return state.countOrder;
    },
    countPendingOrders: state => {
      return state.pendingOrders.length;
    },
    countExecutedOrders: state => {
      return state.executedOrders.length;
    },
    last_price: state => {
      return state.stockprice[state.stockprice.length - 1];
    },
    stockprices: state => {
      return state.stockprice;
    },
    get_cash: state => {
      return state.portfolio.amountCash;
    },
    get_shares: state => {
      return state.portfolio.positions.shares;
    },
    is_short: state => {
      return state.portfolio.positions.shares < 0;
    },
    check_short: state => {
      return state.portfolio.positions.shares >= -Math.abs(state.game.limitShortShares);
    },
    calc_pnl: state => {
      return -state.portfolio.OrgAmountCash + state.portfolio.amountCash + (state.portfolio.positions.shares * state.stockprice[state.stockprice.length - 1])
    },
    calc_avg_buy: state => {
      var qty_shares = 0;
      var cash_amount = 0;

      state.executedOrders.forEach(function(execution) {
        if (execution.qty > 0) {
          qty_shares += Math.abs(execution.qty);
          cash_amount += Math.abs(execution.qty) * execution.execprice;
        }
      });

      if (qty_shares > 0) {
        return cash_amount / qty_shares
      } else {
        return;
      }
    },
    calc_avg_sell: state => {
      var qty_shares = 0;
      var cash_amount = 0;

      state.executedOrders.forEach(function(execution) {
        if (execution.qty < 0) {
          qty_shares += Math.abs(execution.qty);
          cash_amount += Math.abs(execution.qty) * execution.execprice;
        }
      });

      if (qty_shares > 0) {
        return cash_amount / qty_shares
      } else {
        return;
      }
    },
    check_new_survey: state => {
      var foundNewSurvey = false;
      state.surveys.forEach(function(survey) {
        if (!survey.completed) {
          foundNewSurvey = true;
          return;
        }
      });
      return foundNewSurvey;
    },
    active_survey: state => {
      var active_surv = false;
      state.surveys.forEach(function(survey) {
        if (!survey.completed) {
          active_surv = survey;
          return;
        }
      });
      return active_surv;
    },
    count_survey: state => {
      return state.surveys.length;
    },

    short_selling_pct: state => {
      if (state.portfolio.positions.shares < 0) {
        return 'width:' + (100*(state.portfolio.positions.shares / state.game.limitShortShares)) + "%";
      }
    },
  },

  mutations: {
    initGame: (state) => {
      state.connected = false;
      state.showModal = false;
      state.surveys = [];
      state.player = {};
      state.game = {limitShortShares: -20000};
      state.stockprice = [];
      state.portfolio = {positions: {shares: 0}};
      state.countOrder = 0;
      state.pendingOrders = [];
      state.executedOrders = [];
    },

    gameOver: (state) => {
    },

    incOrderId: (state) => {
      state.countOrder++;
    },

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
      state.pendingOrders = state.pendingOrders.filter(order => order.orderid != payLoad.orderid);
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
    },

    insertNewSurvey: (state, payLoad) => {
      state.surveys.push(payLoad);
      //state.showModal = true;
    },

    disableModal: (state, payLoad) => {
      state.showModal = false;
    },

    canCloseSurvey: (state, payLoad) => {
      state.surveys.forEach(function(survey) {
        if (!survey.canClose && survey.name == payLoad) {
          survey.canClose = true;
          return;
        }
      });
    },
    completeSurvey: (state, payLoad) => {
      state.surveys.forEach(function(survey) {
        if (!survey.completed && survey.name == payLoad) {
          survey.completed = true;
          return;
        }
      });
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

      payLoad.mkcontext = {
        last_price: getters.last_price,
      };

      payLoad.prtcontext = {
        countPendingOrders: getters.countPendingOrders,
        countExecutedOrders: getters.countExecutedOrders,
        cash: getters.get_cash,
        shares: getters.get_shares,
        pnl: getters.calc_pnl,
        avg_buy: getters.calc_avg_buy,
        avg_sell: getters.calc_avg_sell,
        is_short: getters.is_short,
      };

      payLoad.game_id = getters.gameId;

      Vue.http.post(location.protocol + '//' + document.domain + ':' + '5000/neworder', payLoad).then(response => {
        //console.log(response.data);
        payLoad.orderid = response.data.orderid;
      }, error => {
        console.log(response);
        commit('incOrderId');
        payLoad.orderid = getters.orderId;
      });


      console.log(payLoad);
      commit( 'insertNewOrder', payLoad );
    },

    CancelOrder: ({commit}, payLoad) => {
      //console.log(payLoad);
      commit( 'removeOrder', payLoad );
    },

    SubmitSurvey: ({commit, getters}, payLoad) => {
      payLoad.game_id = getters.gameId;
      payLoad.mkcontext = {
        last_price: getters.last_price,
      };

      payLoad.prtcontext = {
        countPendingOrders: getters.countPendingOrders,
        countExecutedOrders: getters.countExecutedOrders,
        cash: getters.get_cash,
        shares: getters.get_shares,
        pnl: getters.calc_pnl,
        avg_buy: getters.calc_avg_buy,
        avg_sell: getters.calc_avg_sell,
        is_short: getters.is_short,
      };
      Vue.http.post(location.protocol + '//' + document.domain + ':' + '5000/checksurvey/' + getters.active_survey.name, payLoad).then(response => {
        console.log(response.data);

        if ( response.data.hasOwnProperty('response') ) {
          if ( response.data.response.hasOwnProperty('adjustCash') ) {
            commit('adjustCash', response.data.response.adjustCash);
          }

          if ( response.data.response.hasOwnProperty('adjustShares') ) {
            commit('adjustShares', response.data.response.adjustShares);
          }
        }

        //commit('canCloseSurvey', response.data.name);

        commit('completeSurvey', response.data.name);
      }, error => {
        console.log(response);
        //commit('disableModal', '');
      });
    },

    socket_myResponse: (context, message) => {
      var newPrice = message.number;

      // execute market orders
      context.state.pendingOrders.forEach(function(order) {
        if (order.ordertype == 'MKT') {
          order.orderprice = newPrice;
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");

          Vue.http.post(location.protocol + '//' + document.domain + ':' + '5000/newexecution', order).then(response => {
            //console.log(response.data);
            order.execid = response.data.execid;
          }, error => {
            console.log(response);
          });
          console.log(order);
          context.commit( 'insertNewExec', order );
          context.commit( 'removeOrder', order );
        } else if ( (order.ordertype == 'LMT' && order.side == 'buy' && order.orderprice >= newPrice) || (order.ordertype == 'LMT' && order.side == 'sell' && order.orderprice <= newPrice) ) {
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");

          Vue.http.post(location.protocol + '//' + document.domain + ':' + '5000/newexecution', order).then(response => {
            //console.log(response.data);
            order.execid = response.data.execid;
          }, error => {
            console.log(response);
          });
          console.log(order);


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
  if (context.getters.get_cash < 0) {
    alert("No cash -> game over");
    context.commit('initGame');
  }

  if (!context.getters.check_short) {
    alert("Too short-> game over");
    context.commit('initGame');
  }

  if ( message.hasOwnProperty('survey') ) {
    var newSurvey = {
      completed: false,
      canClose: false,
      name: message.survey,
      submittedContent: {},
      response: {},
    };
    //context.commit( 'insertNewSurvey', newSurvey );
  }

  context.commit('insertNewPriceInMarket', newPrice);
},
}
});
