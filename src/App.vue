<template>
  <div class="container">
    <app-header></app-header>
    <h1>Recap</h1>
<app-portfolio></app-portfolio>

  </div>
</template>

<script>
import Header from './components/Header.vue';

import Portfolio from './components/portfolio/Portfolio.vue';

export default {

  data () {
    return {

    }
  },

  components: {
    appHeader: Header,
    appPortfolio: Portfolio
  }
}
</script>

<style>

</style>
