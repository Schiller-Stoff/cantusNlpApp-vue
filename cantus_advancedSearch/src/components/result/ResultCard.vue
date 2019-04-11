<template>
  <div class="card p-3">
    <blockquote class="blockquote mb-0 card-body">
      <h5>Zeitraum: {{ searchResult.searchParams.chosenTimeFrame }} </h5>
      <p>LO {{ searchResult.searchParams.chosenLO }}</p>
      <footer class="blockquote-footer">
        <p>Genre: {{ searchResult.searchParams.chosenGenre }}</p>
      </footer>
    </blockquote>
  </div>
</template>

<script>
  export default {
    name: "ResultCard",
    props: {
      searchResult: {
        type:Object,
        required:true
      }
    }
  }
</script>

<style scoped>

</style>
