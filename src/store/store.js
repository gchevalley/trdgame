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

    surveys: [],

    disturbances: {
      marketdatafeed: {
        status: false,
        roundRemaining: 20
      },
      softwareupgrade: {
        status: false,
        roundRemaining: 60
      }
    },

    news: [],

    player: {
      ranking: '-',
      rankingPrev: '-',
      rankingChg: '-',
    },

    game: {
      limitShortShares: -20000,
      numberPlayers: 1,
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
    playerId: state => {
      return state.player.name;
    },
    playerRanking:  state => {
      return state.player.ranking;
    },
    playerRankingSpectrum: state => {
      if (state.player.ranking != '-') {
        return state.player.ranking / state.game.numberPlayers;
      } else {
        return 0;
      }
    },
    playerRankingChg: state => {
      return state.player.rankingChg;
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
    get_pendingQty: state => {
      var qty_shares = 0;
      state.pendingOrders.forEach(function(order) {
        qty_shares += Math.abs(order.qty);
      });
      return qty_shares;
    },
    get_pendingQtyMktOrders: state => {
      var qty_shares = 0;
      state.pendingOrders.forEach(function(order) {
        if (order.ordertype == "MKT") {
          qty_shares += Math.abs(order.qty);
        }
      });
      return qty_shares;
    },
    get_qtyLimitOrder: state => {
      return state.game.qtyLimitOrder;
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

    status_disturbances: state => {
      return state.disturbances;
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

    update_playerRanking: (state, payLoad) => {
      if (state.player.ranking != '-' && payLoad != '-') {
        if (payLoad < state.player.ranking) {
          state.player.rankingChg = 'up';
        } else if (payLoad > state.player.ranking) {
          state.player.rankingChg = 'down';
        } else {
          state.player.rankingChg = 'uc';
        }
      } else {
        state.player.rankingChg = '-';
      }
      state.player.rankingPrev = state.player.ranking;
      state.player.ranking = payLoad;
    },

    update_gameNumberPlayers: (state, payLoad) => {
      if (payLoad != 0) {
        state.game.numberPlayers = payLoad;
      }

      if (state.game.numberPlayers == 0) {
        state.game.numberPlayers = 1; // avoid div0
      }
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

    updateDisturbancesTimer: (state) => {
      for (let [name, disturbance] of Object.entries(state.disturbances)) {
        if (disturbance.status == true) {
          disturbance.roundRemaining--;
          if (disturbance.roundRemaining <= 0) {
            disturbance.status = false;
          }
        }
      }
    },

    inject_news: (state, payLoad) => {
      console.log(payLoad);
      state.news = [payLoad].concat( state.news );
    },

    updateNewsTimer: (state) => {
      for (let [name, news] of Object.entries(state.news)) {
        news.timeout--;
      }
      state.news = state.news.filter(item => item.timeout != 0);
    },

    activate_disturbance: (state, payLoad) => {
      for (let [name, disturbance] of Object.entries(state.disturbances)) {
        if (name == payLoad) {
          disturbance.status = true;
          console.log(disturbance);
        }
      }
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
      var count_active_survey = 0;
      state.surveys.forEach(function(survey) {
        if (!survey.completed) {
          count_active_survey++;
          return;
        }
      });


      if (count_active_survey == 0) {
        state.surveys.push(payLoad);
      //state.showModal = true;
    } else {
      console.log("disable survey - already one activated");
    }
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

      Vue.http.post(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + '/neworder', payLoad).then(response => {
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
      Vue.http.post(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + '/checksurvey/' + getters.active_survey.name, payLoad).then(response => {
        console.log(response.data);

        if ( response.data.hasOwnProperty('response') ) {
          if ( response.data.response.hasOwnProperty('adjustCash') ) {
            commit('adjustCash', response.data.response.adjustCash);
          }

          if ( response.data.response.hasOwnProperty('adjustShares') ) {
            commit('adjustShares', response.data.response.adjustShares);
          }
        }

        //commit('completeSurvey', response.data.name);
      }, error => {
        console.log(response);
        //commit('disableModal', '');
      });
      commit('completeSurvey', getters.active_survey.name);
    },

    socket_myResponse: (context, message) => {
      var newPrice = message.number;

      // execute market orders
      context.state.pendingOrders.forEach(function(order) {
        if (order.ordertype == 'MKT') {
          order.orderprice = newPrice;
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");

          Vue.http.post(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + '/newexecution', order).then(response => {
            order.execid = response.data.execid;
          }, error => {
            console.log(response);
          });
          //console.log(order);
          context.commit( 'insertNewExec', order );
          context.commit( 'removeOrder', order );
        } else if ( (order.ordertype == 'LMT' && order.side == 'buy' && order.orderprice >= newPrice) || (order.ordertype == 'LMT' && order.side == 'sell' && order.orderprice <= newPrice) ) {
          order.execprice = newPrice;
          order.exectimestamp = moment().format("HH:mm:ss");

          Vue.http.post(location.protocol + '//' + document.domain + ':' + (location.port == '8080' ? '5000': location.port) + '/newexecution', order).then(response => {
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

      if (context.getters.get_cash < 0) {
        //alert("No cash -> game over");
        //context.commit('initGame');
      }

      if (!context.getters.check_short) {
        //alert("Too short-> game over");
        //context.commit('initGame');
      }

      if ( message.hasOwnProperty('survey') ) {
        var newSurvey = {
          completed: false,
          canClose: false,
          name: message.survey,
          submittedContent: {},
          response: {},
        };
        context.commit( 'insertNewSurvey', newSurvey );
      }

      if ( message.hasOwnProperty('idx') ) {
        if (message.idx > 10) {
          if ( message.hasOwnProperty('scoreboard') ) {
            if (message.scoreboard.indexOf(context.getters.playerId) != -1) {
              context.commit( 'update_playerRanking', message.scoreboard.indexOf(context.getters.playerId) + 1);
              if (message.hasOwnProperty('numberPlayers') ) {
                if ( message.numberPlayers != 0) {
                  context.commit('update_gameNumberPlayers', message.numberPlayers);
                }
              }
            } else {
              context.commit( 'update_playerRanking', '-');
            }
          }
        }
      }

      if (message.hasOwnProperty('disturbance') ) {
        //console.log("disturbance from last price update: " + message.disturbance)
        context.commit( 'activate_disturbance', message.disturbance )
      }
      context.commit('updateDisturbancesTimer');

      if (message.hasOwnProperty('news') ) {
        context.commit( 'inject_news', message.news )
      }
      context.commit('updateNewsTimer');

      (new Vue()).$socket.emit('score', {player: context.getters.playerId,
        game: context.getters.gameId,
        shares: context.getters.get_shares,
        cash: context.getters.get_cash,
        pnl: context.getters.calc_pnl,
        price_avg_buy: context.getters.calc_avg_buy,
        price_avg_sell: context.getters.calc_avg_sell,
      });

      context.commit('insertNewPriceInMarket', newPrice);
    },
  }
});
