<template>
  <div class="col-md-8">
    <div v-if="$store.getters.status_disturbances.marketdatafeed.status">
      <h2>market data feed issue</h2>
      <p>Trading is still up</p>
    </div>
    <div v-else>
      <vue-chartist id="stockchart"
      class="ct-major-tenth"
      :data="chartData"
      :options="chartOptions"
      type="Line"
      ref="stockchart"
      :listener="chartEvent">
    </vue-chartist>

    <p>Quick
      <div class="col-md-6">
      <button v-for="quick in quickOrders" type="button" class="btn btn-sm btn-info" @click="newQuickOrderShares('buy', quick)">+{{quick}}</button>
    </div>
    <div class="col-md-6">
      <button v-for="quick in quickOrders" type="button" class="btn btn-sm btn-danger" @click="newQuickOrderShares('sell', -quick)">-{{quick}}</button>
    </div>
    </p>
  </div>

</div>
</template>

<script>

import VueChartist from 'v-chartist';

export default {

  data () {
    return {

      quickOrders: [100, 500, 1000, 2000, 5000],

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

      chartEvent: {
        draw: function(event) {
        },
        created: function(event) {
        }
      }
    }
  },

  mounted() {

  },

  methods: {
    newQuickOrderShares(side, qty) {
      this.$store.dispatch('newOrder', {ordertimestamp: this.$moment().format("HH:mm:ss"), asset: 'shares', side: side, qty: qty, orderprice: '' } )
    },
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

}

</script>

<style>
.ct-label {
  font-size: 11px;
  color: black;
}
</style>
