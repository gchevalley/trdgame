<template>
  <div class="col-md-8">
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
        <tr v-for="order in pendingOrders">
          <td>{{order.timestamp}}</td>
          <td v-if="order.side == 'buy'"><span class="label label-info">{{order.qty}}</span></td>
          <td v-else><span class="label label-danger">{{order.qty}}</span></td>
          <td>{{order.asset}}</td>
          <td><button type="button" class="btn btn-danger btn-xs">Cancel</button></td>
        </tr>
      </tbody>
    </table>
    <hr />
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
        <tr v-for="exec in executedOrders">
          <td><span class="badge">{{exec.round}}</span></td>
          <td v-if="exec.side == 'buy'"><span class="label label-info">{{exec.qty}}</span></td>
          <td v-else><span class="label label-danger">{{exec.qty}}</span></td>
          <td>{{exec.asset}}</td>
          <td>{{exec.price}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data () {
    return {
      pendingOrders: [{timestamp: '21:13', asset: 'shares', side: 'sell', qty: -45}],
      executedOrders: [{round: 3, asset: 'shares', side: 'buy', qty: 345, price: 12.45},
    {round: 5, asset: 'put 12 - maturity 13', side: 'sell', qty: -80, price: 13.65}]
    }
  }
}
</script>
