<template>
  <div class="container-fluid" v-if="curChartData">
    <br>
    <div class="ResultPreview_headerIconContainer">
      <i class="fas fa-arrows-alt-h" @click="showHistoViz = !showHistoViz"></i>
    </div>

    <div class="ResultPreview_histoViz" v-if="showHistoViz">
      <h4>Visualisierung des Suchverlaufs</h4>
      <hr>
      <!--<app-pie-chart v-if="curChartData" :chartData="curChartData"></app-pie-chart>-->
      <app-bar-chart :chartData="refHistoVizData"></app-bar-chart>
      <hr>
      <div class="ResultPreview_searchParamsContainer">
        <h5><em>Gewählter LO: {{searchParams.chosenLO}}</em></h5>
        <h5><em>{{timespanOrFeast}}</em></h5>
        <h5><em>Gewähltes Genre: {{ searchParams.chosenGenre }}</em></h5>
      </div>
      <hr>
      <br>
      <app-line-chart :chartData="refHistoVizData"></app-line-chart>
      <!--<app-radar-chart :chartData="refHistoVizData"></app-radar-chart>-->
    </div>

    <app-result-preview-compare :vizCompareData="vizCompareData" :searchParams="searchParams" v-if="!showHistoViz"></app-result-preview-compare>

  </div>
</template>

<script>
  import PieChart from './charts/PieChart'
  import BarChart from './charts/BarChart'
  import LineChart from './charts/LineChart'
  import RadarChart from './charts/RadarChart'
  import ResultPreviewCompare from './compare/ResultPreviewCompare'

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
      },
      vizCompareData:{
        required:true,
        type:Array
      }
    },
    components: {
      appPieChart: PieChart,
      appBarChart: BarChart,
      appLineChart: LineChart,
      appRadarChart: RadarChart,
      appResultPreviewCompare: ResultPreviewCompare
    },
    data(){
      return {
        showHistoViz:true
      }
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
          let timeFrame = dp.searchParams.chosenFeast === "default" ? dp.searchParams.chosenTimeFrame : dp.searchParams.chosenFeast    // default behavior controlled by method timespanOrFeast
          let singleLabel = `${dp.searchParams.chosenLO}, ${dp.searchParams.chosenGenre}, ${timeFrame}`
          obj.labels.push(singleLabel)
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
  @import '/../../scss/globalVariables/globalVariables.scss';

  em {
    text-decoration: none;
    font-weight: 600;
  }

  .container-fluid {
    max-width: 50em;
  }

  .ResultPreview_searchParamsContainer {
    background-color: $primaryColor;
    padding: .25em;
    border-radius: .5em;
  }

</style>
