<template>
    <div class="container-fluid" :class="delayedDisplay">
      <h2>LO {{lo}}</h2>
      <p>Zeitraum: {{ searchParamsObj.chosenTimeSpan }}</p>
      <p>Genre: {{ searchParamsObj.chosenGenre }}</p>
      <hr>
      <br>
      <br>
      <v-client-table :data="refinedTableData" :columns="columns" :options="options"></v-client-table>
    </div>
</template>

<script>
  import {EventBus} from "../../main";

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
        delayedDisplay:'hidden',
        searchParamsObj: {
          chosenLo: '-',
          chosenTimeSpan: '-',
          chosenGenre: '-'
        },
        columns: ['officeLabel', 'res'],
        options: {
          // see the options API
        },

        lo: ''
      }
    },
    computed: {
      refinedTableData(){
        //TODO computed runs everytime when component created instead of re-ajaxed
        let refined = []
        for (let dataPoint of this.tableData){
          refined.push({officeLabel:dataPoint.officelabel, res:dataPoint.res})
        }
        return refined;
      }
    },
    created(){
      let self = this;
      setTimeout(_=>{
        this.delayedDisplay = 'animated fadeIn once faster'
      },200);

      EventBus.$on('searchBarEnlarge',_=>{
        this.delayedDisplay = 'hidden'
      });

      EventBus.$on('newSearch',searchParams =>{
        console.log(searchParams);
        console.log(searchParams.chosenLo);

        self.searchParamsObj = searchParams


        this.lo = searchParams.chosenLo;
        console.log(this.lo);
      })
    }

  }
</script>

<style scoped>

  .container-fluid {
    /*margin-top: 5vh;*/
  }

</style>
