
<!--HERE IS NO TEMPLATE ALLOWED!-->


<script>
    import {Pie} from 'vue-chartjs'
    export default {
      extends: Pie,
      props:{
        labels: {
          type: Array,
          default(){return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
        },
        datasets: {
          type:Array,
          default(){ return [
            {
              label: 'GitHub Commits',
              backgroundColor: '#f87979',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }
          ]}
        }
      },
      mounted () {
        // Overwriting base render method with actual data.
        this.renderChart({
          labels: this.labels,
          datasets: this.datasets
        })
      }
    }
</script>

