
<script>
  // CommitChart.js
  import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
    props: {
      labels: {
        type: Array,
        required: true,
        default(){
          return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
      },
      datasets: {
        type:Array,
        required:true,
        default(){
          return [{
              label: 'GitHub Commits',
              backgroundColor: 'blue',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }]
        }
      }
    },
    watch: {
      datasets(){
        this.renderChart({
          labels: this.labels,
          datasets: this.datasets
        })
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets
      })
    }
  }
</script>

