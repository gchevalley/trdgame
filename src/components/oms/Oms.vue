<template>
  <div class="col-md-4">

    <app-omsstocks></app-omsstocks>
    <div v-if="$store.state.omsOption">
      <app-omsoptions></app-omsoptions>
    </div>

  </div>


</template>


<script>

import Omsstocks from './Omsstocks.vue';
import Omsoptions from './Omsoptions.vue';

export default {

  data () {
    return {

    }
  },

  components: {
    appOmsstocks: Omsstocks,
    appOmsoptions: Omsoptions,

  }
}
</script>
