
<script>
  // CommitChart.js
  import {Bubble} from 'vue-chartjs'

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
        display: true,
        ticks: {
          display: true
          //min: 0
        }
      }],
      xAxes: [{
        ticks: {
          display: false //this will remove only the label from tick
          //callback: function(value, index, values) {      // with that we could hide the x-ticks when 4
          //if (index <4) return value
          //}
          //min: 0
        },
        scaleLabel: {
          display: false,
          labelString: 'Suchergebnisse'
        }
      }]
    }
  }

  export default {
    extends: Bubble,
    props: {
      chartData:{
        type:Object
      }
    },
    watch: {
      datasets(){
        this.renderChart(this.chartData, options)
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart(this.chartData, options)
    }
  }
</script>

