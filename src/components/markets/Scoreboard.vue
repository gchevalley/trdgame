<template>
  <div>
    <nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Scoreboard</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
      </ul>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
  <div class="container">
    <!--<h1>Scoreboard</h1>-->
    <transition-group name="flip-list" tag="ul" class="list-group">
      <li v-for="(player, i) in scoreboard" v-bind:key="player" class="list-group-item">
        <h3> <span class="badge">{{i+1}}</span> {{ player }}</h3>
      </li>
    </transition-group>
  </div>
</div>
</template>

<script>

export default {

  data () {
    return {
    }
  },

  methods: {
  },

  computed: {

    scoreboard() {
      return this.$store.getters.scoreboard.slice(0, Math.min(10, this.$store.getters.scoreboard.length) );
    },

  },

}

</script>


<style>

  .flip-list-move {
    transition: transform 1s;
  }

  body {
      padding-top: 60px;
  }

</style>
