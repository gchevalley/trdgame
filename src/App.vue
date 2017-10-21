<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <app-portfolio></app-portfolio>
      <app-stockchart></app-stockchart>
    </div>

    <div class="row">
      <app-oms></app-oms>
      <app-orderbook></app-orderbook>
    </div>


  </div>
</template>

<script>
import Header from './components/Header.vue';

import Portfolio from './components/portfolio/Portfolio.vue';
import Stockchart from './components/markets/Stockchart.vue';

import Oms from './components/oms/Oms.vue';
import Orderbook from './components/oms/Orderbook.vue';

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
    my_connection: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("my_connection", data)')
    }
  },



}
</script>

<style>

</style>
