<template>
  <div>
    <app-header></app-header>
    <div class="container">

      <div class="row">
        <app-portfolio></app-portfolio>
        <app-stockchart></app-stockchart>
      </div>

      <div class="row">
        <app-oms></app-oms>
        <app-orderbook></app-orderbook>
      </div>


    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

import Portfolio from './portfolio/Portfolio.vue';
import Stockchart from './markets/Stockchart.vue';

import Oms from './oms/Oms.vue';
import Orderbook from './oms/Orderbook.vue';

export default {

  data () {
    return {

    }
  },

  components: {
    appHeader: Header,
    appPortfolio: Portfolio,
    appStockchart: Stockchart,
    appOms: Oms,
    appOrderbook: Orderbook
  },

  sockets:{
    connect: function(){
      console.log('socket connected')
    },
  },



}
</script>

<style>

</style>
