import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    player: {
      name: "tom@unige.ch",
      ranking: 5
    },

    game: {
      currentRound: 9,
    },

    stockprice: [],

    portfolio: {
      amountCash: 500,
      positions: {
        shares : 425,
        derivatives: [{'call 18': 25},
          {'put 15': -10}
        ]}
    },

    pendingOrders: [{id: 'o1', timestamp: '21:13', asset: 'shares', side: 'sell', qty: -45, price: 23}],
    executedOrders: [{round: 5, asset: 'shares', side: 'buy', qty: 345, price: 12.45},
      {round: 3, asset: 'put 12 - maturity 13', side: 'sell', qty: -80, price: 13.65},
      {round: 2, asset: 'shares', side: 'buy', qty: 25, price: 18.20}],

  },

  getters: {
    last_price: state => {
      return state.stockprice[state.stockprice.length - 1];
    },
    stockprices: state => {
      return state.stockprice;
    }
  },

  mutations: {
    insertNewPriceInMarket: (state) => {
      var newPrice = Math.floor(Math.random() * 23) + 1;

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
      state.executedOrders = [payLoad].concat( state.executedOrders );
    }
  },

  actions: {
    updateMarket: ({commit, getters}) => {
      var previousPrice = getters.last_price;
      commit('insertNewPriceInMarket')
      var newPrice = getters.last_price;
      
      //console.log(previousPrice + ' ' + newPrice);

    },

    newOrder: ({commit, getters}, payLoad) => {
      if (payLoad.price != '') {
        commit( 'insertNewOrder', payLoad );
      } else {
        payLoad.price = getters.last_price;
        commit( 'insertNewExec', payLoad );
      }
    },

    CancelOrder: ({commit}, payLoad) => {
      commit( 'removeOrder', payLoad );
    },
  }
});
