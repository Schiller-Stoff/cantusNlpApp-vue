
<!--HERE IS NO TEMPLATE ALLOWED!-->


<script>
    import {Pie} from 'vue-chartjs'
    export default {
      extends: Pie,
      props:{
        chartData: {
          type:Object //TODO add some validation
        }
      },
      watch: {
        chartData(){
          this.renderChart(this.chartData)
        }
      },
      mounted () {
        // Overwriting base render method with actual data.
        this.renderChart(this.chartData)
      },
    }
</script>

