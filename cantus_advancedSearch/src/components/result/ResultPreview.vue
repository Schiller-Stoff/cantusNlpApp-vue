<template>
  <div class="container-fluid">
    <br>
    <h4>Visualisierung des Suchverlaufs</h4>
    <hr>
    <!--<app-pie-chart v-if="curChartData" :chartData="curChartData"></app-pie-chart>-->
    <!--<hr>-->
    <!--<h5>LO - {{searchParams.chosenLO}}</h5>-->
    <!--<h5>{{timespanOrFeast}}</h5>-->
    <!--<h5>Genre: {{ searchParams.chosenGenre }}</h5>-->
    <!--<hr>-->
    <app-bar-chart v-if="curChartData" :chartData="refHistoVizData"></app-bar-chart>
    <hr>
    <br>
    <hr>
    <app-line-chart v-if="curChartData" :chartData="refHistoVizData"></app-line-chart>
    <!--<app-radar-chart :chartData="refHistoVizData"></app-radar-chart>-->
  </div>
</template>

<script>
  import PieChart from './charts/PieChart'
  import BarChart from './charts/BarChart'
  import LineChart from './charts/LineChart'
  import RadarChart from './charts/RadarChart'

  export default {
    name: "ResultPreview",
    props: {
      vizHistoData: {
        type:Array
      },
      curChartData:{
        required:true,
        type:Object
      },
      searchParams:{
        type:Object,
        required:true,
        validator(value){
          let demandedKeys = ['chosenLO','chosenGenre','chosenTimeFrame']
          for (let key of demandedKeys){
            try {
              if(value[key]===undefined)throw new Error();
            } catch (e) {
              console.error('Key not found in buildData prop for BuildBlock.vue. Demanded key: ' + key);
              return false;
            }
          }
          return true;
        }
      }
    },
    components: {
      appPieChart: PieChart,
      appBarChart: BarChart,
      appLineChart: LineChart,
      appRadarChart: RadarChart
    },
    computed: {
      refHistoVizData(){
        let obj = {
          labels: [],
          datasets: []
        }

        let dataObj = {
          label:'',
          backgroundColor:[],
          data: []
        }

        for (let dp of this.vizHistoData){
          dataObj.label = "Feste";
          obj.labels.push(dp.labels[0])
          dataObj.backgroundColor.push(dp.datasets[0].backgroundColor[0])
          dataObj.data.push(dp.datasets[0].data[0])
        }
        obj.datasets.push(dataObj)

        return obj;

      },
      timespanOrFeast(){
        let feast = this.searchParams.chosenFeast
        if(feast==='default'){
          return "Gewählter Zeitraum: " + this.searchParams.chosenTimeFrame
        } else {
          return "Gewähltes Fest: " + feast
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .container-fluid {
    //margin-top:3em;
    max-width: 30em;
  }

</style>
