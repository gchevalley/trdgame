<template>
  <div class="col-md-8">
    <div v-show="$store.state.pendingOrders.length > 0">
      <h3>Order book</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Quantity</th>
            <th>Asset</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in $store.state.pendingOrders" :key="order.id">
            <td>{{order.timestamp}}</td>
            <td v-if="order.side == 'buy'"><span class="label label-info">{{order.qty}}</span></td>
            <td v-else><span class="label label-danger">{{order.qty}}</span></td>
            <td>{{order.asset}}</td>
            <td><button type="button" class="btn btn-danger btn-xs" @click="cancelPendingOrder(order)">Cancel</button></td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
    <div v-show="$store.state.executedOrders.length > 0">
      <h3>Executions</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Quantity</th>
            <th>Asset</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exec in $store.state.executedOrders">
            <td><span class="badge">{{exec.round}}</span></td>
            <td v-if="exec.side == 'buy'"><span class="label label-info">{{exec.qty}}</span></td>
            <td v-else><span class="label label-danger">{{exec.qty}}</span></td>
            <td>{{exec.asset}}</td>
            <td>{{exec.price}}</td>
          </tr>
        </tbody>
      </table>
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
    cancelPendingOrder(order) {
      //console.log(order);
      this.$store.dispatch('CancelOrder', order)
    }
  }
}
</script>
