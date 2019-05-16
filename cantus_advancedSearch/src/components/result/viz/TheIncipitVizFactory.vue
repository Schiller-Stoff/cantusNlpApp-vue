<template>
  <app-the-result-preview
    :searchParams="incipitSearch.searchParams"
    :vizHistoData="incipitVizHistory"
  ></app-the-result-preview>
</template>

<script>

  import TheResultPreview from './../compare/TheResultPreview'

  export default {
    name: "TheIncipitVizFactory",
    components:{
      appTheResultPreview:TheResultPreview
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
      }
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
