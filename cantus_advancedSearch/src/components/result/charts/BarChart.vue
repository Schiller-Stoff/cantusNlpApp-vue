
<script>
  // CommitChart.js
  import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
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

