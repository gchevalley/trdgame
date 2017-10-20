<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top navbar-inverse">
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
          <p class="navbar-text">{{clock}}</p>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Market</a></li>
            <li><a href="#">Orders</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <p class="navbar-text">Signed in as {{$store.state.player.name}}</p>
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

</style>
