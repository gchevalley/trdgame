<template>
  <div class="col-md-8">
    <vue-chartist id="stock-chart"
    class="ct-major-tenth"
    :data="chartData"
    :options="chartOptions"
    type="Line">
  </vue-chartist>
  </div>
</template>

<script>

import VueChartist from 'v-chartist';

export default {

  data () {
    return {

      // We are setting a few options for our chart and override the defaults
      chartOptions: {
        showArea: true,

        // Don't draw the line chart points
        showPoint: true,
        // Disable line smoothing
        lineSmooth: false,
        // X-Axis specific configuration
        axisX: {
          // We can disable the grid for this axis
          showGrid: false,
          // and also don't show the label
          showLabel: false
        },
        // Y-Axis specific configuration
        axisY: {
          // Lets offset the chart a bit from the labels
          offset: 60,
          // The label interpolation function enables you to modify the values
          // used for the labels on each axis. Here we are converting the
          // values into million pound.
          labelInterpolationFnc: function(value) {
            return '$ ' + value;
          }
        }
      },
    }
  },

  mounted() {

  },

  methods: {

  },

  computed: {

    chartData() {
      var currentTS = this.$store.getters.stockprices;
      return {
        labels: Array.apply(null, {length: currentTS.length}).map(Number.call, Number),
        series:[
          currentTS
        ]
      }
    },

  },

  components: {
    'vue-chartist': VueChartist
  },

/*
  sockets:{
    my_response: function(data){
      console.log('this method was fired by the socket server. eg: io.emit("my_response", data)');
      console.log(data.number);
    }
  },
  */

}

</script>

<style>
.ct-label {
  font-size: 11px;
  color: black;
}
</style>
