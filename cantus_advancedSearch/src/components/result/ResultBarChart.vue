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
        let colors = [];
        for (let point of this.vizDataResults){
          labels.push(point.searchParams.chosenLO + " - " + point.searchParams.chosenGenre)
          data.push(point.lengthCount)
          colors.push(this.randomColor())
        }
        return {
          labels: labels,
          data: [
            {
              label: 'Feste',
              backgroundColor: colors,
              data: data
            }
          ]
        }
      }
    },
    components: {
      appBarChart: BarChart
    },
    methods: {
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    },
  }
</script>

<style scoped>

</style>
