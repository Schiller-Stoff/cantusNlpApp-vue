<template>
  <div class="row">
    <!--<div id="nlpCantus_container" v-html="curHtml"></div>-->
    <div v-html="cantusHead"></div>
    <div class="col-md-8">
      <button @click="getNext10Pages()" class="btn btn-success">Next</button>
      <div id="nlpCantus_container" v-html="curHtml"></div>
    </div>
    <div class="col-md-2">

    </div>


  </div>
</template>

<script>
  export default {
    name: "Cantus",
    data(){
      return {
        cantusResponse:"",
        cantusHead:"",
        curHtml: "",

        cantusArray:"",
        cantusTail:"",
        curArrayPages:1
      }
    },
    methods: {
      loadContent(){
        // GET /someUrl
        this.$http.get('https://gams.uni-graz.at/o:cantus.salzburg/sdef:TEI/get?mode=view:edition&locale=de').then(response => {
          // get body data
          this.cantusResponse = response.body;

          let testArray = response.body.split('<h3')
          for(let i=0;i<testArray.length;i++){
            if(i!==0)testArray[i] ='<h3' + testArray[i];  //readd removed h3 from split
          }

          // assigning variables
          let cantusHead = testArray[0];


          // assign data variables with according to cantus content
          this.cantusArray = testArray;
          this.cantusTail=testArray[testArray.length-1];


          cantusHead = this.clearCantusHead(cantusHead);

          // assigning to data ...> render it in dom
          this.cantusHead = cantusHead;


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
      },
      clearCantusHead(cantusHeadStr){

        let indStart = cantusHeadStr.search("<header");
        let indEnd = cantusHeadStr.search("<\/header>");
        let header = cantusHeadStr.substring(indStart, indEnd);

        return header;

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

  div {
    text-align: left;
  }


</style>
