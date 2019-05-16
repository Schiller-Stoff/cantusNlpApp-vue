<template>
  <div>
    <app-bar-chart
      :chartData="refHistoVizData"
    ></app-bar-chart>
    <app-line-chart
      :chartData="refHistoVizData"
    ></app-line-chart>
  </div>
</template>

<script>

  //TODO correct component folder strucutre/hierarchy

  import TheResultPreview from './../compare/TheResultPreview'
  import BarChart from './../compare/charts/BarChart'
  import LineChart from '../compare/charts/LineChart'

  export default {
    name: "TheIncipitVizFactory",
    components:{
      appTheResultPreview:TheResultPreview,
      appBarChart: BarChart,
      appLineChart:LineChart
    },
    props:{
      incipitSearch:{
        required:true
      },
      incipitOngoingSearch:{
        required:true
      },
      incipitSearchFailed:{
        required:true
      },
      incipitSearchHistory: {
        required:true
      }
    },
    data(){
      return {
        incipitVizHistory:[]
      }
    },
    computed: {
      incipitDiagramData(){
        let resultCount = this.incipitSearch.response.body.length
        return {
          label:'Incipits',
          backgroundColor: [this.randomColor()],
          data: [resultCount]
        };
      },
      incipitChartData(){
        return {
          labels:[this.incipitSearch.searchParams.chosenGenre, 'Rest'],
          datasets: [this.incipitDiagramData],
          searchParams:this.incipitSearch.searchParams
        }
      },
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

        for (let dp of this.incipitVizHistory){
          dataObj.label = "Incipits";
          let timeFrame = dp.searchParams.chosenFeast === "default" ? dp.searchParams.chosenTimeFrame : dp.searchParams.chosenFeast    // default behavior controlled by method timespanOrFeast
          let singleLabel = `${dp.searchParams.chosenLO}, ${dp.searchParams.chosenGenre}, ${timeFrame}`
          obj.labels.push(singleLabel)
          dataObj.backgroundColor.push(dp.datasets[0].backgroundColor[0])
          dataObj.data.push(dp.datasets[0].data[0])
        }
        obj.datasets.push(dataObj)

        return obj;

      },
    },
    watch: {
      incipitSearchHistory:{
        deep:true,
        handler(){
          this.incipitVizHistory.push(this.incipitChartData)
          console.log(this.incipitVizHistory)
        }
      }
    },
    methods: {
      toggleTable(){
        return this.showTable = !this.showTable
      },
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    }
  }
</script>

<style scoped>

</style>
