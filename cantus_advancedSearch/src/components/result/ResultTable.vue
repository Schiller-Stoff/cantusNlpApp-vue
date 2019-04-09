<template>
    <div id="people" class="container-fluid">
      <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
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
    }

  }
</script>

<style scoped>

</style>
