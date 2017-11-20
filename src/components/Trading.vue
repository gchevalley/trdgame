<template>
  <div>
    <app-header></app-header>
    <app-modal v-if="$store.getters.check_new_survey"></app-modal>
    <div class="container">

      <div class="row">
          <app-news></app-news>
      </div>

      <div class="row">
        <app-portfolio></app-portfolio>
        <app-stockchart></app-stockchart>
      </div>

      <div class="row">
        <app-oms></app-oms>
        <app-orderbook></app-orderbook>
      </div>

      <!--<div class="row">
        <div class="col-md-4">
        </div>
        <app-news></app-news>
      </div>-->


    </div>
  </div>
</template>

<script>
import Header from './Headerstandalone.vue';

import Modal from './Modal.vue';

import Portfolio from './portfolio/Portfolio.vue';
import Stockchart from './markets/Stockchart.vue';

import Oms from './oms/Oms.vue';
import Orderbook from './oms/Orderbook.vue';

import News from './news/News.vue';

window.onbeforeunload = function(e) {
  console.log('prevent refresh');
  e.preventDefault();
  return false;
}

export default {

  data () {
    return {

    }
  },

  components: {
    appHeader: Header,
    appModal: Modal,
    appPortfolio: Portfolio,
    appStockchart: Stockchart,
    appOms: Oms,
    appOrderbook: Orderbook,
    appNews: News
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
