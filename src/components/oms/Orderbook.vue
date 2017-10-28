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
          <tr v-for="order in $store.state.pendingOrders" :key="order.orderid">
            <td>{{order.ordertimestamp}}</td>
            <td v-if="order.side == 'buy'"><span class="label label-info">{{order.qty | flexNumber(0, ".", "'")}} @ {{order.orderprice}}</span></td>
            <td v-else><span class="label label-danger">{{order.qty | flexNumber(0, ".", "'")}} @ {{order.orderprice}}</span></td>
            <td>{{order.asset}}</td>
            <td><button type="button" class="btn btn-danger btn-xs" @click="cancelPendingOrder(order)">Cancel</button></td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
    <div v-show="$store.state.executedOrders.length > 0">
      <h3>Executions <small>average price per share: <span class="label label-info">{{$store.getters.calc_avg_buy | flexNumber(2, ".", "'")}}</span> / <span class="label label-danger">{{$store.getters.calc_avg_sell | flexNumber(2, ".", "'")}}</span></small></h3>
      <table class="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Quantity</th>
            <th>Asset</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exec in $store.state.executedOrders" :key="exec.execid">
            <td>{{exec.exectimestamp}}</td>
            <td v-if="exec.side == 'buy'"><span class="label label-info">{{exec.qty | flexNumber(0, ".", "'")}}</span></td>
            <td v-else><span class="label label-danger">{{exec.qty | flexNumber(0, ".", "'")}}</span></td>
            <td>{{exec.asset}}</td>
            <td>{{exec.execprice | flexNumber(2, ".", "'")}}</td>
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
