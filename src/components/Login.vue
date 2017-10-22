<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3>login</h3>
          <form class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-sm-3" for="login">Email</label>
              <div class="col-sm-8">
                <input v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('email') }"
                type="email" class="form-control"
                v-model="email"
                id="email"
                name="email"
                placeholder="Email address">
                <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <button type="button" class="btn btn-info" @click="joinTheGame">Join the Game</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Trading from './components/Trading.vue';
import Header from './Header.vue';

export default {

  data () {
    return {
      email: '',
    }
  },

  methods: {
    joinTheGame() {
      if (this.email != '') {
        this.$http.post(location.protocol + '//' + document.domain + ':' + '5000' + "/connect", {'login': this.email}).then(response => {
          this.$store.dispatch('login', response.data);
          }, error => {
            console.log(response);
          });
      }
    }
  },

  components: {
    appHeader: Header,
  },

}
</script>

<style>
.help.is-danger {
  color: #ff3860;
}

.help {
  display: block;
  margin-top: .25rem;
}
</style>
