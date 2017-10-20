<template>
  <div class="col-md-4">
    <h3>Recap</h3>
    <table class="table">
      <tbody>
        <tr>
          <th>Current Round</th>
          <td><span class="badge">{{$store.state.game.currentRound}}</span></td>
        </tr>
        <tr>
          <th>Shares</th>
          <td>{{$store.state.portfolio.positions.shares}} units</td>
        </tr>
        <tr>
          <th>Ranking</th>
          <td>{{$store.state.player.ranking}} <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true" style="color:red"></span></td>
        </tr>
        <tr>
          <th>Cash</th>
          <td>$ {{$store.state.portfolio.amountCash}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
