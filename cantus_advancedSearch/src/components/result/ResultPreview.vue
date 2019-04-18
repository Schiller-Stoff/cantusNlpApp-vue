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

  export default {
    name: "ResultPreview",
    props: {
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
      appPieChart: PieChart
    }
  }
</script>

<style scoped lang="scss">

  .container-fluid {
    //margin-top:3em;
    max-width: 30em;
  }

</style>
