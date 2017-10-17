<template>
  <div class="col-md-4">
    <h3>Recap</h3>
    <table class="table">
      <tbody>
        <tr>
          <th>Current Round</th>
          <td><span class="badge">{{game.currentRound}}</span></td>
        </tr>
        <tr>
          <th>Shares</th>
          <td>{{portfolio.positions.shares}} units</td>
        </tr>
        <tr>
          <th>Ranking</th>
          <td>{{player.ranking}} <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true" style="color:red"></span></td>
        </tr>
        <tr>
          <th>Cash</th>
          <td>$ {{portfolio.amountCash}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      game: {
        currentRound: 9,
      },

      portfolio: {
        amountCash: 500,
        positions: {
          shares : 425,
          derivatives: [{'call 18': 25},
          {'put 15': -10}
        ]}
      },

      player: {
        name: "tom@unige.ch",
        ranking: 5
      }
    }
  }
}
</script>

<style>

</style>
