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

      <div class="form-group">
        <label class="control-label col-sm-4" for="texttrader">Text trader</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="texttrader" placeholder="Comment">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-10">
          <button type="button" class="btn btn-info" @click="newBuyOrderShares">Buy</button>
          <button type="button" class="btn btn-danger" @click="newSellOrderShares">Sell</button>
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
    newBuyOrderShares() {
      if (this.sharesOrderQty != '') {
        this.$store.dispatch('newOrder', {id: 'o2', timestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'buy', qty: this.sharesOrderQty, price: this.sharesLimitPrice} )
        this.sharesOrderQty = '';
        this.sharesLimitPrice = '';
      }
    },

    newSellOrderShares() {
      if (this.sharesOrderQty != '') {
        this.$store.dispatch('newOrder', {id: 'o3', timestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: 'sell', qty: -Math.abs(this.sharesOrderQty), price: this.sharesLimitPrice} )
        this.sharesOrderQty = '';
        this.sharesLimitPrice = '';
      }
    }

  },

}


</script>

<style

</style>
