<template>
  <div v-show="$store.state.news.length > 0" class="col-md-8">
    <h3>News ({{$store.state.news.length}})</h3>

      <div class="panel-group" id="accordion">
        <div v-for="(news, index) in $store.state.news" class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" :href="'#collapse' + index"><span class="label label-default">{{news.category}}</span> {{news.title}}</a>
            </h4>
          </div>
          <div :id="'collapse' + index" class="panel-collapse collapse">
            <div class="panel-body">
              {{news.details}}
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
</script>

<style>
</style>
