<template>

  <div>
    <app-bar-chart :labels="refactoredData.labels" :datasets="refactoredData.data" :class="delayedDisplay"></app-bar-chart>
  </div>

</template>

<script>
  import BarChart from './charts/BarChart'
  import {mapGetters} from 'vuex'

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
    data() {
      return {
        delayedDisplay: 'hidden'
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState'
      }),
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
    watch: {
      searchBarEnlarged(newValue, oldValue) {
        this.delayedDisplay = 'hidden'
      }
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
    created(){
      setTimeout(_=>{
        this.delayedDisplay = 'animated fadeIn once faster'
      },200);
    }
  }
</script>

<style scoped>

</style>
