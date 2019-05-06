<template>
  <div>
    <div class="ResultPreviewCompare_headerIconContainer">
      <h4>Vergleichende Visualisierung</h4>
      <hr>
      <app-bar-chart :chartData="refVizCompareData"></app-bar-chart>
      <hr>
      <div class="ResultPreviewCompare_searchParamsContainer">
        <h5><em>Gewählter LO: Alle LO</em></h5>
        <h5><em>{{timespanOrFeast()}}</em></h5>
        <h5><em>Gewähltes Genre: {{ searchParams.chosenGenre }}</em></h5>
      </div>
      <hr>
      <app-pie-chart :chart-data="refVizCompareData"></app-pie-chart>
    </div>
  </div>
</template>

<script>
  import BarChart from './../charts/BarChart'
  import LineChart from './../charts/LineChart'
  export default {
    name: "ResultPreviewCompare",
    components: {
      appBarChart:BarChart,
      appPieChart:LineChart
    },
    props: {
      vizCompareData: {
        required:true,
        type:Array
      },
      searchParams:{
        required:true,
        type:Object
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
          obj.labels.push(dp.l.substring(dp.l.length,dp.l.length-12))
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
          //obj.labels.push(1)      // avoid! -> will add further lables that are simply not needed
          total.backgroundColor.push("lightgrey") //TODO randomize color
          total.data.push(dp.gesamt)
        }
        obj.datasets.push(total)

        return obj;
      }
    },
    methods: {
      timespanOrFeast(){
        let feast = this.searchParams.chosenFeast
        if(feast==='default'){
          return "Gewählter Zeitraum: " + this.searchParams.chosenTimeFrame
        } else {
          return "Gewähltes Fest: " + feast
        }
      }
    },
    created(){
      // here send ajax=? for compare data?
      // but only if no data is available? -> or searchParams are not the same.
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../scss/globalVariables/globalVariables.scss';

  .ResultPreviewCompare_searchParamsContainer {
    background-color: $primaryColor;
    padding: .25em;
    border-radius: .5em;
  }

  em {
    text-decoration: none;
    font-weight: 600;
  }

</style>
