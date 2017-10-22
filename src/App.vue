<template>
  <div>
    <app-trading v-if="$store.state.connected"></app-trading>
    <app-login v-else></app-login>
  </div>
</template>

<script>

import Login from './components/Login.vue';
import Trading from './components/Trading.vue';

export default {

  data () {
    return {

    }
  },

  components: {
    appLogin: Login,
    appTrading: Trading,
  },

}
</script>

<style>

</style>
