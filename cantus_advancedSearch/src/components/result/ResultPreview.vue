<template>
  <div>
    <h4>Anzahl der Feste</h4>
    <hr>

    <app-pie-chart v-if="prevData" :labels="refactoredData.labels" :datasets="refactoredData.data"></app-pie-chart>
    <hr>
    <h5>LO - {{searchParams.chosenLO}}</h5>
    <h5>Zeitraum: {{ searchParams.chosenTimeFrame }}</h5>
    <h5>Genre: {{ searchParams.chosenGenre }}</h5>
    <hr>
  </div>
</template>

<script>
  import PieChart from './PieChart'

  export default {
    name: "ResultPreview",
    props: {
      prevData:{
        type:Array,
        required:true
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
    },
    computed: {
      refactoredData(){
        return {
          labels: ['RP','Rest'],
          data: [
            {
              label: 'GitHub Commits',
              backgroundColor: ['#FF9D40','#0047bb'],
              data: [this.prevData.length, 500]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  div {
    //margin-top:3em;
    max-width: 30em;
  }

</style>
