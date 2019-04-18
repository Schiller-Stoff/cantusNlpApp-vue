<template>
  <div class="container-fluid">
    <h4>Anzahl der Feste</h4>
    <hr>

    <app-pie-chart v-if="curChartData" :chartData="curChartData"></app-pie-chart>
    <hr>
    <h5>LO - {{searchParams.chosenLO}}</h5>
    <h5>Zeitraum: {{ searchParams.chosenTimeFrame }}</h5>
    <h5>Genre: {{ searchParams.chosenGenre }}</h5>
    <hr>
  </div>
</template>

<script>
  import PieChart from './charts/PieChart'
  import BarChart from './charts/BarChart'

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
      appBarChart: BarChart
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
