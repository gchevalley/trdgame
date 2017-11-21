<template>
  <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header page-scroll">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-nav" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Trading</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="top-nav">
      <!--<ul class="nav navbar-nav">
        <li class="active"><a href="#">Link L1<span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link L2</a></li>
        <li class="dropdown">
        </li>
      </ul>-->

      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="navbar-link-header">Line1<br /></span>line2</a></li>
        <li><a href="#">LinkR2</a></li>

      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>


<script>


$(document).ready(function(){
  var scrollTop = 0;
  $('#fakebody').scroll(function(){
    scrollTop = $('#fakebody').scrollTop();
     $('.counter').html(scrollTop);

    if (scrollTop >= 100) {
      $(".navbar-default").addClass('navbar-shrink');
      $(".navbar-link-header").hide();
    } else if (scrollTop < 100) {
      $(".navbar-default").removeClass('navbar-shrink');
      $(".navbar-link-header").show();
    }

  });

});


</script>

<style>

@media screen and (min-width: 992px) {

  .navbar-default {
    padding: 30px 0;
    transition: padding 0.3s;
  }

  .navbar-default.navbar-shrink {
    padding: 10px 0;
  }

}

.navbar-default a {
  line-height: 42px;
  font-weight: 700;
  font-size: 20px;
}

.navbar-defautl a.brand > img {
  max-width: 70px;
}

</style>
