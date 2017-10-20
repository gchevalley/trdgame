<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <app-portfolio></app-portfolio>
      <app-stockchart></app-stockchart>
    </div>

    <div class="row">
      <app-omsstocks></app-omsstocks>
      <app-orderbook></app-orderbook>
    </div>


  </div>
</template>

<script>
import Header from './components/Header.vue';

import Portfolio from './components/portfolio/Portfolio.vue';
import Stockchart from './components/markets/Stockchart.vue';

import Omsstocks from './components/oms/Omsstocks.vue';
import Omsoptions from './components/oms/Omsoptions.vue';
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
    appOmsstocks: Omsstocks,
    appOmsoptions: Omsoptions,
    appOrderbook: Orderbook
  }
}
</script>

<style>

</style>
