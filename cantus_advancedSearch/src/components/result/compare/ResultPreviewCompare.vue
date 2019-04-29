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
          dataObj.label = "Feste";
          obj.labels.push(dp.l)
          dataObj.backgroundColor.push("red") //TODO randomize color
          dataObj.data.push(dp.mitgenre)
        }
        obj.datasets.push(dataObj)

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
