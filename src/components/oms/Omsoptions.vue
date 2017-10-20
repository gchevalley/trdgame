<template>
  <div class="col-md-4">
    <h3>New Order - Options</h3>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-4" for="quantity">Quantity</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="quantity" placeholder="Enter quantity" v-model.number="optionsOrderQty">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-4" for="quantity">Call/Put</label>
        <div class="col-sm-4">
          <select class="form-control" v-model="optionsCallPut">
            <option>Call</option>
            <option>Put</option>
          </select>
        </div>
      </div>

      

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-10">
          <button type="button" class="btn btn-info" @click="newBuyOrderOptions">Buy</button>
          <button type="button" class="btn btn-danger" @click="newSellOrderOptions">Sell</button>
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
      optionsOrderQty: '',
      optionsCallPut: 'Put',
    }
  },

  methods: {
    newBuyOrderOptions() {
      if (this.optionsOrderQty != '') {
        this.$store.dispatch('newOrder', {id: 'o2', timestamp: '22:22', asset: 'shares', side: 'buy', qty: this.optionsOrderQty} )
      }
    },

    newSellOrderOptions() {
      if (this.optionsOrderQty != '') {
        this.$store.dispatch('newOrder', {id: 'o3', timestamp: '22:33', asset: 'shares', side: 'sell', qty: -Math.abs(this.optionsOrderQty)} )
      }
    }

  },

}


</script>

<style>
</style>
