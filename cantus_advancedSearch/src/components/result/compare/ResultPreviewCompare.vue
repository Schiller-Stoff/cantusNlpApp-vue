<template>
  <div>
    <div class="ResultPreviewCompare_headerIconContainer">
      <h4>Vergleichende Visualisierung</h4>
      <hr>
      <p>Hi! I'm the ResultPreviewCompare Component!</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "ResultPreviewCompare",
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters({

      }),
    },
    methods: {

    },
    created(){
      // here send ajax=? for compare data?
      // but only if no data is available? -> or searchParams are not the same.
    }
  }
</script>

<style scoped lang="scss">


</style>
