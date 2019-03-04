<template>
  <div class="card text-center">
    <div class="card-header">
      <!--<h5>LO Name</h5>-->
      <!--<hr>-->
      <button class="btn btn-link float-right">Close</button>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">WordCloud</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Table</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Overview</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <iframe src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <br>
      <a href="#" class="btn btn-primary">Toggle Lemma/Corpus</a>
      <button class="btn btn-secondary">Remove Card</button>
      <!--<button>Lemma</button>-->
      <hr>
      <h5>{{ corpora[1].name }}</h5>
    </div>
  </div>


    <!--<blockquote class="blockquote mb-0">-->
      <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>-->
      <!--<footer class="blockquote-footer">-->
        <!--<small>-->
          <!--Someone famous in <cite title="Source Title">Source Title</cite>-->
        <!--</small>-->
      <!--</footer>-->
    <!--</blockquote>-->
</template>

<script>
    export default {
      name: "VoyantCard",
      props: ['corpora']
    }
</script>

<style scoped>

  h5 {

  }

  .card {
    min-height: 400px;
    min-width: 600px;
    /*border: none;*/
  }

  iframe {
    margin:-18px;
    padding: 0;
    width: 100%;
    height: 600px;
    border: none;
  }



</style>
