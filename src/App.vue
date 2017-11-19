<template>
  <div id="fakebody">
    <app-trading v-if="$store.state.connected"></app-trading>
    <app-login v-else></app-login>
  </div>
</template>

<script>

import Modal from './components/Modal.vue';
import Login from './components/Login.vue';
import Trading from './components/Trading.vue';


$(document).ready(function() {
	$('#fakebody').scroll(function() {
		console.log("scroll", $('#fakebody').scrollTop());
		if ($('#fakebody').scrollTop() > 10) {
			$('nav').addClass('shrink');
		} else {
			$('nav').removeClass('shrink');
		}
	});
});

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
    overflow-y: hidden;
}
#fakebody {
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    z-index: 2;
    margin: 0;
    padding:0;
    overflow-y: auto;
}
</style>
