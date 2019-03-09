<template>
  <div>
    <div id="nlpCantus_container" v-html="curHtml"></div>
  </div>
</template>

<script>
  export default {
    name: "Cantus",
    data(){
      return {
        curHtml: ""
      }
    },
    methods: {
      loadContent(){
        // GET /someUrl
        this.$http.get('https://gams.uni-graz.at/o:cantus.salzburg/sdef:TEI/get?mode=view:edition&locale=de').then(response => {
          // get body data
          this.curHtml = response.body;

        }, response => {
          // error callback
        });
      }
    },
    created(){
      this.loadContent();
    }

  }
</script>

<style scoped lang="scss">

  #nlpCantus_container {
    text-align: left;
  }



</style>
