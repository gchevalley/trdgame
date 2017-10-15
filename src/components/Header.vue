<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Trading</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Market</a></li>
            <li><a href="#">Orders</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <p class="navbar-text">Signed in as {{player.name}}</p>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
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
        shares: 25,
      },

      player: {
        name: "tom@unige.ch",
        Ranking: 5
      },

    }
  }
}
</script>

<style>

</style>
