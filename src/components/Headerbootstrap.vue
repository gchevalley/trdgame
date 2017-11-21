<template>
  <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>-->
        <a class="navbar-brand hidden-xs" href="#">Trading</a>

<div class="navbar-header-menu">
        <ul v-if="$store.state.connected" class="nav navbar-nav">
          <li>
            <a class="" href="#">
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
                      {{$store.state.portfolio.positions.shares/1000 | flexNumber(1, ".", "'")}}k sh
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
                    <td>{{$store.state.portfolio.amountCash/1000000 | flexCurrency('', 3, ".", "'")}}m</td>
                  </tr>
                </tbody>
              </table>
            </a>
          </li>
          <!--<li>
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
          </li>-->
        </ul>
      </div>
      </div>
    </div>
  </nav>
</template>

<script>

$(document).ready(function() {
	$('#fakebody').scroll(function() {
		//console.log("scroll", $('#fakebody').scrollTop());
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

.navbar-header-menu {
    float: left;
}

    .navbar-header-menu > .navbar-nav {
        float: left;
        margin: 0;
    }

        .navbar-header-menu > .navbar-nav > li {
            float: left;
        }

            .navbar-header-menu > .navbar-nav > li > a {
                padding-top: 15px;
                padding-bottom: 15px;
            }

        .navbar-header-menu > .navbar-nav .open .dropdown-menu {
            position: absolute;
            float: left;
            width: auto;
            margin-top: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            border: 1px solid rgba(0,0,0,.15);
            -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
            box-shadow: 0 6px 12px rgba(0,0,0,.175);
        }

    .navbar-header-menu > .navbar-form {
        float: left;
        width: auto;
        padding-top: 0;
        padding-bottom: 0;
        margin-right: 0;
        margin-left: 0;
        border: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

        .navbar-header-menu > .navbar-form > .form-group {
            display: inline-block;
            margin-bottom: 0;
            vertical-align: middle;
        }

    .navbar-header-menu > .navbar-left {
        float: left;
    }

    .navbar-header-menu > .navbar-right {
        float: right !important;
    }

    .navbar-header-menu > *.navbar-right:last-child {
        margin-right: -15px !important;
    }



body {
  padding-top: 80px;
}
nav .navbar-brand {
  font-size: 20px;
  height: 40px;
}
nav .navbar-toggle {
  margin: 13px 15px 13px 0;
}

nav .navbar thead {
  visibility: visible;
}

nav a {
  font-size: 20px;
  padding-bottom: 15px !important;
  padding-top: 15px !important;
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
  padding-bottom: 10px !important;
  padding-top: 10px !important;
}
nav.navbar.shrink .navbar-toggle {
  margin: 8px 15px 8px 0;
  padding: 4px 5px;
}

</style>
