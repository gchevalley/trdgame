<template>
  <div class="col-md-4">
    <h3>New Order</h3>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-4" for="quantity">Quantity</label>
        <div class="col-sm-6">
          <input type="email" class="form-control" id="quantity" placeholder="Enter quantity">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-4" for="texttrader">Text trader</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="texttrader" placeholder="Comment">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-10">
          <button type="button" class="btn btn-info">Buy</button>
          <button type="button" class="btn btn-danger">Sell</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

</script>
