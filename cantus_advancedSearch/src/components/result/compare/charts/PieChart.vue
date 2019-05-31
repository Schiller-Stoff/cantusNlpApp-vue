<!--HERE IS NO TEMPLATE ALLOWED!-->


<script>
  let options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      //for displaying tooltips
    },
    scales: { //hides the y axis
      yAxes: [{
        display: false,
        ticks: {
          display: true,
          min: 0
        }
      }],
      xAxes: [{
        ticks: {
          display: false, //this will remove only the label from tick
          //callback: function(value, index, values) {      // with that we could hide the x-ticks when 4
          //if (index <4) return value
          //}
          min: 0
        },
        scaleLabel: {
          display: false,
          labelString: 'Suchergebnisse'
        }
      }]
    }
  }



  import {Pie} from 'vue-chartjs'

  export default {
    extends: Pie,
    props: {
      chartData: {
        type: Object //TODO add some validation
      }
    },
    watch: {
      chartData() {
        this.renderChart(this.chartData, options)
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart(this.chartData, options)
    },
  }
</script>

