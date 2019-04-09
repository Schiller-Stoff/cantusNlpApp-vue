<template>
    <div id="people" class="container-fluid">
      <v-client-table :data="refinedTableData" :columns="columns" :options="options"></v-client-table>
    </div>
</template>

<script>
  export default {
    name: "ResultTable",
    props: {
      tableData: {
        required: true,
        type: Array,
        default(){
          return [
            { officeLabel: 1, res: "John"},
            { officeLabel: 2, res: "Jane"},
            { officeLabel: 3, res: "Susan"},
            { officeLabel: 4, res: "Chris"},
            { officeLabel: 5, res: "Dan"}
          ]
        }
      }
    },
    data(){
      return {
        columns: ['officeLabel', 'res'],
        options: {
          // see the options API
        }
      }
    },
    computed: {
      refinedTableData(){
        console.log(this.tableData)
        let refined = []
        for (let dataPoint of this.tableData){
          refined.push({officeLabel:dataPoint.officelabel, res:dataPoint.res})
        }
        return refined;
      }
    },

  }
</script>

<style scoped>

</style>
