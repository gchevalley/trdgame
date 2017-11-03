<template>
  <div class="col-md-4">
    <h3 class="hidden-xs">Recap</h3>
    <table class="table">
      <tbody>
        <!--<tr>
        <th>Current Round</th>
        <td><span class="badge">{{$store.state.game.currentRound}}</span></td>
      </tr>-->
      <tr class="hidden-xs">
        <th>Ranking</th>
        <td>{{$store.getters.playerRanking}} <span class="glyphicon" :class="{'glyphicon-triangle-bottom': $store.getters.playerRankingChg == 'down' , 'glyphicon-triangle-top': $store.getters.playerRankingChg == 'up', 'glyphicon glyphicon-minus': $store.getters.playerRankingChg == 'uc' || $store.getters.playerRankingChg == '-' }" aria-hidden="true" :style="{color: $store.getters.playerRankingChg == 'up' ? 'green' : 'red'}"></span></td>
      </tr>
      <tr class="hidden-xs">
        <th>Shares</th>
        <td>
          {{$store.state.portfolio.positions.shares | flexNumber(0, ".", "'")}} units
          <br />
          <div v-show="$store.state.portfolio.positions.shares<0" class="progress">
            <div class="progress-bar progress-bar-danger" role="progressbar" :aria-valuenow="$store.state.portfolio.positions.shares"
            aria-valuemin="-20000" aria-valuemax="0" :style="$store.getters.short_selling_pct">
          </div>
        </div>
      </td>
    </tr>
    <tr class="hidden-xs">
      <th>Cash</th>
      <td>{{$store.state.portfolio.amountCash | flexCurrency('CHF ', 2, ".", "'")}}</td>
    </tr>
    <tr>
      <th>Profit & Loss</th>
      <td :style="{'color' : $store.getters.calc_pnl >= 0 ? 'green' : 'red'}">{{ $store.getters.calc_pnl | flexCurrency('CHF ', 2, ".", "'")}}</td>
    </tr>

    <!--<tr>
    <th>Underyling Last Price</th>
    <td>{{$store.getters.last_price}}</td>
  </tr>-->
</tbody>
</table>
</div>
</template>

<script>

export default {
  data () {
    return {

    }
  },

  filters: {

  }
}
</script>

<style>

.progress {height: 10px;}

</style>
