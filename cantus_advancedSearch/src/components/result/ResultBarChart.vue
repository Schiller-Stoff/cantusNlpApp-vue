<template>

  <div>
    <app-bar-chart :labels="refactoredData.labels" :datasets="refactoredData.data"></app-bar-chart>
  </div>

</template>

<script>
  import BarChart from './charts/BarChart'

  export default {
    name: "ResultBarChart",
    props: {
      vizDataResults: {
        type: Array,
        required: true,
        validator(val) {
          let firstEntry = val[0]
          let requiredKeys = ['searchParams', 'lengthCount']
          for (let key of requiredKeys) {
            if (!firstEntry.hasOwnProperty(key)) return false;
          }
          return true
        }
      },
    },
    computed: {
      refactoredData() {
        let labels = [];
        let data = [];
        for (let point of this.vizDataResults){
          labels.push(point.searchParams.chosenLO + " - " + point.searchParams.chosenGenre)
          data.push(point.lengthCount)
        }
        return {
          labels: labels,
          data: [
            {
              label: 'Feste',
              backgroundColor: ['#FF9D40','#0047bb'],
              data: data
            }
          ]
        }
      }
    },
    components: {
      appBarChart: BarChart
    }
  }
</script>

<style scoped>

</style>
