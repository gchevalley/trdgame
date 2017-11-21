<template>
  <nav id="global-nav" class="nav">
  <div class="container">
    <div class="pull-left"><h1 class="site-title">Site Title</h1></div>
    <div class="pull-right">
      <ul class="nav-list">
        <li>
          <table>
            <thead><tr><th>Title</th></tr></thead>
            <tbody><tr><td>value</td></tr></tbody>
          </table>
        </li>
        <li>
          <table>
            <thead><tr><th>Title</th></tr></thead>
            <tbody><tr><td>value</td></tr></tbody>
          </table>
        </li>
        <li>
          <table>
            <thead><tr><th>Title</th></tr></thead>
            <tbody><tr><td>value</td></tr></tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
</script>

<style>
#global-nav {
  position: fixed;
  top: 0;
  z-index: 9999;
  height: 150px;
  width: 100%;
  background: #324c5f;
  color: #fff;
  line-height: 75px;
    -webkit-transition: height .5s, line-height .5s; /* Safari */
    transition: height .5s, line-height .5s;
}

.site-title {
  display: inline-block;
  -webkit-transition: all .5s;
    transition: all .5s;
}

.scrolled-nav .site-title  {
  font-size: 16px;
}

.nav-list {
  list-style: none;
}

.nav-list li {
  list-style: none;
  display: inline-block;
  padding-left: 20px;
  background-color:red;
}

.scrolled-nav {
  height: 60px !important;
  line-height: 60px !important;
}

.counter {
  width: 20px;
  height: 20px;
  background: black;
  color: #fff;
  position: fixed;
  top: 120px;
  right: 0;
}
</style>
