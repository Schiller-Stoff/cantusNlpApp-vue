<template>
  <div>
    <h4>Analyse</h4>
    <hr>
    <h5>Lorem Ipsum</h5>
    <app-pie-chart v-if="prevData" :labels="refactoredData.labels" :datasets="refactoredData.data"></app-pie-chart>
  </div>
</template>

<script>
  import PieChart from './PieChart'

  export default {
    name: "ResultPreview",
    props: ['prevData'],
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
    margin-top:3em;
    max-width: 30em;
  }

</style>
