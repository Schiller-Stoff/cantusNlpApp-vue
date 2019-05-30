
<script>
  // CommitChart.js
  import {Line} from 'vue-chartjs'
  let options = {
    legend: {display:false},
    responsive: true,
    maintainAspectRatio: false,
    scales: { //hides the y axis
      xAxes: [{
        display: true,
        ticks: {
          display: false //this will remove only the label
        },
        scaleLabel: {
          display: true,
          labelString: 'Suchergebnisse'
        }
      }]
    }
  }

  export default {
    extends: Line,
    props: {
      chartData:{
        type:Object
      }
    },
    watch: {
      chartData(){
        this.renderChart(this.chartData,options)
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart(this.chartData,options)
    }
  }
</script>

