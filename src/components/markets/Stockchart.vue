<template>
  <div class="col-md-8">
    <!-- <img src="../../assets/stockprice.png" class="img-responsive" /> -->
    <div id="stock-chart" class="ct-major-tenth"></div>
  </div>
</template>

<script>

export default {

  mounted() {

    // We are setting a few options for our chart and override the defaults
    var options = {
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
    };
    new this.$chartist.Line('#stock-chart', {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      series: [
        [5.4, 9, 7.8, 8, 5, 3, 5.1, 4.2, 3, 5, 6, 4.5, 1, 5, 6, 10, 4, 8, 12.7, 5]
      ]
    }, options);

  }

}
</script>

<style>
.ct-label {
  font-size: 11px;
  color: black;
}
</style>
