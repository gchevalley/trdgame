<template>
  <div>
    <app-trading v-if="$store.state.connected"></app-trading>
    <app-login v-else></app-login>
  </div>
</template>

<script>

import Modal from './components/Modal.vue';
import Login from './components/Login.vue';
import Trading from './components/Trading.vue';

export default {

  data () {
    return {
      showModal: false,
    }
  },

  components: {
    appModal: Modal,
    appLogin: Login,
    appTrading: Trading,
  },

}
</script>

<style>

</style>
