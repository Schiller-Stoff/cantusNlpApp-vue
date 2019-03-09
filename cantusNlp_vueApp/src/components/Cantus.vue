<template>
  <div>
    <button @click="getNext10Pages()" class="btn btn-success">Next</button>
    <!--<div id="nlpCantus_container" v-html="curHtml"></div>-->

    <div id="nlpCantus_container" v-html="curHtml"></div>


  </div>
</template>

<script>
  export default {
    name: "Cantus",
    data(){
      return {
        curHtml: "",
        cantusArray:"",
        curArrayPages:0
      }
    },
    methods: {
      loadContent(){
        // GET /someUrl
        this.$http.get('https://gams.uni-graz.at/o:cantus.salzburg/sdef:TEI/get?mode=view:edition&locale=de').then(response => {
          // get body data
          //this.curHtml = response.body;

          let testArray = response.body.split('<h3')
          console.log(testArray);
          this.cantusArray = testArray
          this.curArrayPages = 0


        }, response => {
          // error callback
        });
      },
      getNext10Pages(){
        let initialPageCount = this.curArrayPages;
        this.curArrayPages += 10;

        let aggr_str="";
        for(let i=initialPageCount; i<=this.curArrayPages; i++){
          aggr_str += this.cantusArray[i];
        }

        this.curHtml = aggr_str;
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
