<template>
  <div>
    <div class="ResultPreviewCompare_headerIconContainer">
      <h4>Vergleichende Visualisierung</h4>
      <hr>
      <p>Hi! I'm the ResultPreviewCompare Component!</p>
      <app-bar-chart :chartData="refVizCompareData"></app-bar-chart>
    </div>
  </div>
</template>

<script>
  import BarChart from './../charts/BarChart'
  export default {
    name: "ResultPreviewCompare",
    components: {
      appBarChart: BarChart
    },
    props: {
      vizCompareData: {
        required:true,
        type:Array
      }
    },
    data(){
      return {

      }
    },
    computed: {
      refVizCompareData(){

        let obj = {
          labels: [],
          datasets: []
        }

        let dataObj = {
          label:'',
          backgroundColor:[],
          data: []
        }

        for (let dp of this.vizCompareData){
          dataObj.label = "Genre";
          obj.labels.push(dp.l)
          dataObj.backgroundColor.push("blue") //TODO randomize color
          dataObj.data.push(dp.mitgenre)
        }
        obj.datasets.push(dataObj)


        // from here a second dataset is created with the total numbers
        let total = {
          label:'',
          backgroundColor:[],
          data: []
        }

        for (let dp of this.vizCompareData){
          total.label = "Feste";
          obj.labels.push(dp.l)
          total.backgroundColor.push("lightgrey") //TODO randomize color
          total.data.push(dp.gesamt)
        }
        obj.datasets.push(total)

        return obj;
      }
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
