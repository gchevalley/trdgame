<template>
  <div>
    <div v-if="$store.getters.status_disturbances.softwareupgrade.status">
      <h3>вставить новый заказ - акции</h3>
      <form class="form-horizontal">

        <div class="form-group">
          <label class="control-label col-sm-4" for="shareslimitprice">цена</label>
          <div class="col-sm-6">
            <input type="number" class="form-control" id="shareslimitpricerus" v-model.number="sharesLimitPrice">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-sm-4" for="quantity">количество</label>
          <div class="col-sm-6">
            <input type="number" v-validate="'required|max_value:10000'" class="form-control" :class="{'input': true, 'is-danger': errors.has('quantity') }" id="quantityrus" name="quantityrus" v-model.number="sharesOrderQty">
            <span v-show="sharesOrderQty>10000" class="help is-danger">Quantity is capted to 10'000 for liquidity reasons</span>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-10">
            <button type="button" class="btn btn-lg" :class="{disabled: !$store.getters.check_short}" @click="newSellOrderShares">продавать</button>
            <button type="button" class="btn btn-lg" :class="{disabled: $store.getters.get_cash < 0}" @click="newBuyOrderShares">купить</button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <h3>New Order - Shares</h3>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-sm-4" for="quantity">Quantity</label>
          <div class="col-sm-6">
            <input type="number" v-validate="'required|max_value:10000'" class="form-control" :class="{'input': true, 'is-danger': errors.has('quantity') }" id="quantity" name="quantity" placeholder="Enter quantity" v-model.number="sharesOrderQty">
            <span v-show="sharesOrderQty>10000 || sharesOrderQty > ($store.getters.get_qtyLimitOrder - $store.getters.get_pendingQtyMktOrders)" class="help is-danger">Quantity is capted to 10'000 for liquidity reasons</span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-sm-4" for="shareslimitprice">Price</label>
          <div class="col-sm-6">
            <input type="number" class="form-control" id="shareslimitprice" placeholder="Market" v-model.number="sharesLimitPrice">
          </div>
        </div>

        <div v-show="$store.state.player.textTrader" class="form-group">
          <label class="control-label col-sm-4" for="texttrader">Text trader</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="texttrader" placeholder="Comment">
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-10">
            <button type="button" class="btn btn-info btn-lg" :class="{disabled: $store.getters.get_cash < 0 || sharesOrderQty > ($store.getters.get_qtyLimitOrder - $store.getters.get_pendingQtyMktOrders)}" @click="newBuyOrderShares">Buy</button>
            <button type="button" class="btn btn-danger btn-lg" :class="{disabled: !$store.getters.check_short || sharesOrderQty > ($store.getters.get_qtyLimitOrder - $store.getters.get_pendingQtyMktOrders) }" @click="newSellOrderShares">Sell</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  data () {
    return {
      sharesOrderQty: '',
      sharesLimitPrice: '',
    }
  },

  methods: {

    cleanOms() {
      this.sharesOrderQty = '';
      this.sharesLimitPrice = '';
    },

    newBuyOrderShares() {
      if (this.$store.getters.get_cash > 0 && this.sharesOrderQty != '' && (this.sharesLimitPrice == '' || this.sharesLimitPrice > 0 && Math.abs(this.sharesOrderQty) <= (this.$store.getters.get_qtyLimitOrder - this.$store.getters.get_pendingQtyMktOrders) ) ) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('newOrder', {ordertimestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'buy', qty: Math.abs(this.sharesOrderQty), orderprice: this.sharesLimitPrice } );
            this.cleanOms();
            return;
          }
        });

      }
    },

    newSellOrderShares() {
      if (this.$store.getters.check_short && this.sharesOrderQty != '' && (this.sharesLimitPrice == '' || this.sharesLimitPrice > 0 && Math.abs(this.sharesOrderQty) <= (this.$store.getters.get_qtyLimitOrder - this.$store.getters.get_pendingQtyMktOrders) ) ) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('newOrder', {ordertimestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'sell', qty: -Math.abs(this.sharesOrderQty), orderprice: this.sharesLimitPrice } );
            this.cleanOms();
            return;
          }
        });
      }
    }

  },

}


</script>

<style
.input.is-danger, .textarea.is-danger {
    border-color: #ff3860;
}

.help.is-danger {
  color: #ff3860;
}

.help {
  display: block;
  margin-top: .25rem;
}
</style>
