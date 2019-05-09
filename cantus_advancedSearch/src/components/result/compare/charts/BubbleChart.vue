
<script>
  // CommitChart.js
  import {Bubble} from 'vue-chartjs'

  export default {
    extends: Bubble,
    props: {
      chartData:{
        type:Object
      }
    },
    watch: {
      datasets(){
        this.renderChart(this.chartData)
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart(this.chartData)
    }
  }
</script>

