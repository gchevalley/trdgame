<template>
  <div>
    <h3>New Order - Shares</h3>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-4" for="quantity">Quantity</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="quantity" placeholder="Enter quantity" v-model.number="sharesOrderQty">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-4" for="shareslimitprice">Price</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="shareslimitprice" placeholder="Market" v-model.number="sharesLimitPrice">
        </div>
      </div>

      <div v-show="$store.textTrader" class="form-group">
        <label class="control-label col-sm-4" for="texttrader">Text trader</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="texttrader" placeholder="Comment">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-10">
          <button type="button" class="btn btn-info btn-lg" @click="newBuyOrderShares">Buy</button>
          <button type="button" class="btn btn-danger btn-lg" @click="newSellOrderShares">Sell</button>
        </div>
      </div>
    </form>
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
      if (this.sharesOrderQty != '' && (this.sharesLimitPrice == '' || this.sharesLimitPrice > 0 ) ) {
        this.$store.dispatch('newOrder', {ordertimestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'buy', qty: Math.abs(this.sharesOrderQty), orderprice: this.sharesLimitPrice } )
        this.cleanOms();
      }
    },

    newSellOrderShares() {
      if (this.sharesOrderQty != '' && (this.sharesLimitPrice == '' || this.sharesLimitPrice > 0 ) ) {
        this.$store.dispatch('newOrder', {ordertimestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'sell', qty: -Math.abs(this.sharesOrderQty), orderprice: this.sharesLimitPrice } )
        this.cleanOms();
      }
    }

  },

}


</script>

<style

</style>
