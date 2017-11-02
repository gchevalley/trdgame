<template>
  <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Trading</a>

        <ul v-if="$store.state.connected" class="nav navbar-nav pull-right">
          <li>
            <a href="#">
              <table style="text-align:center;"><thead>
                <tr>
                  <th>Ranking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{$store.getters.playerRanking}} <span class="glyphicon" :class="{'glyphicon-triangle-bottom': $store.getters.playerRankingChg == 'down' , 'glyphicon-triangle-top': $store.getters.playerRankingChg == 'up', 'glyphicon glyphicon-minus': $store.getters.playerRankingChg == 'uc' || $store.getters.playerRankingChg == '-' }" aria-hidden="true" :style="{color: $store.getters.playerRankingChg == 'up' ? 'green' : 'red'}"></span></td>
                </tr>
              </tbody>
              </table>
            </a>
          </li>
          <li class="active">
            <a href="#">
              <table style="text-align:center;">
                <thead>
                  <tr>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {{$store.state.portfolio.positions.shares | flexNumber(0, ".", "'")}} units
                  </td>
                  </tr>
                </tbody>
              </table>
            </a>
          </li>
          <li class="active">
            <a href="#">
              <table style="text-align:center;">
                <thead>
                  <tr>
                    <th>Cash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{$store.state.portfolio.amountCash | flexCurrency('CHF ', 2, ".", "'")}}</td>
                  </tr>
                </tbody>
              </table>
            </a>
          </li>
          <li>
            <a href="#">
              <table style="text-align:center;">
                <thead>
                  <tr>
                    <th>Profit & Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td :style="{'color' : $store.getters.calc_pnl >= 0 ? 'green' : 'red'}">{{ $store.getters.calc_pnl | flexCurrency('CHF ', 2, ".", "'")}}</td>
                  </tr>
                </tbody>
              </table>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

$(window).scroll(function() {
  if ($(document).scrollTop() > 10) {
    $('nav').addClass('shrink');
    console.log('scroll-shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});

export default {
  data () {
    return {
      clock: this.$moment().format("HH:mm:ss"),

    }
  },

  methods: {
    updateClock() {
      var self = this;
      this.clock = this.$moment().format("HH:mm:ss");
      setTimeout(self.updateClock, 1000);
    }
  },

  mounted: function() {
    this.updateClock();
  }

}
</script>

<style>

body {
  padding-top: 80px;
}
nav .navbar-brand {
  font-size: 30px;
}
nav .navbar-toggle {
  margin: 13px 15px 13px 0;
}

nav .navbar thead {
  visibility: visible;
}

nav a {
  font-size: 18px;
  padding-bottom: 20px !important;
  padding-top: 20px !important;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
nav.navbar.shrink {
  min-height: 15px;
}
nav.navbar.shrink .navbar-brand {
  font-size: 15px;
}

nav.navbar.shrink thead {
  visibility: collapse;
}

nav.navbar.shrink a {
  font-size: 15px;
  padding-bottom: 20px !important;
  padding-top: 10px !important;
}
nav.navbar.shrink .navbar-toggle {
  margin: 8px 15px 8px 0;
  padding: 4px 5px;
}

</style>
