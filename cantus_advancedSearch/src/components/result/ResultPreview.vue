<template>
  <div>
    <app-pie-chart v-if="prevData" :labels="refactoredData.labels" :datasets="refactoredData.data"></app-pie-chart>
    <button @click="showData">Inspect</button>
  </div>
</template>

<script>
  import PieChart from './PieChart'
  import {EventBus} from "../../main";

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
    },
    methods: {
      showData(){
        EventBus.$emit('updateHere')
      }
    }
  }
</script>

<style scoped lang="scss">

  div {
    margin-top:3em;
  }

</style>
