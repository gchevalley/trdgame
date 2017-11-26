<template>
  <div id="fakebody">
    <app-trading v-if="$store.state.connected"></app-trading>
    <app-login v-else></app-login>
  </div>
</template>

<script>

import Modal from './Modal.vue';
import Login from './Login.vue';
import Trading from './Trading.vue';


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

body {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: -1px;
    z-index: 1;
    margin: 0;
    padding: 0;
    /*padding-top: 150px;*/
    overflow-y: hidden;
}
#fakebody {
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    z-index: 2;
    margin: 0;
    /*padding:0;*/
    padding-top: 150px;
    overflow-y: auto;
}
</style>
