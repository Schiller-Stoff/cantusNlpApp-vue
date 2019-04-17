<template>
    <div class="container-fluid" :class="delayedDisplay">
      <h2>LO {{searchParams.chosenLO}}</h2>
      <p>Zeitraum: {{ searchParams.chosenTimeFrame }}</p>
      <p>Genre: {{ searchParams.chosenGenre}}</p>
      <hr>
      <br>
      <br>
      <v-client-table :data="refinedTableData" :columns="columns" :options="options"></v-client-table>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

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
      },
      searchParams:{
        type:Object,
        required:true,
        validator(value){
          let demandedKeys = ['chosenLO','chosenGenre','chosenTimeFrame']
          for (let key of demandedKeys){
            try {
              if(value[key]===undefined)throw new Error();
            } catch (e) {
              console.error('Key not found in buildData prop for BuildBlock.vue. Demanded key: ' + key);
              return false;
            }
          }
          return true;
        }
      }
    },
    data(){
      return {
        delayedDisplay:'hidden',
        columns: ['officeLabel', 'res'],
        options: {
          // see the options API
        }
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState'
      }),

      refinedTableData(){
        //TODO computed runs everytime when component created instead of re-ajaxed
        let refined = []
        for (let dataPoint of this.tableData){
          refined.push({officeLabel:dataPoint.officelabel, res:dataPoint.res})
        }
        return refined;
      }
    },
    watch: {
      searchBarEnlarged(newValue, oldValue) {
        if(this.searchBarEnlarged){
          this.delayedDisplay = 'hidden'
        } else {
          this.delayedDisplay = ''
        }
      }
    },
    created(){
      setTimeout(_=>{
        this.delayedDisplay = 'animated fadeIn once faster'
      },200);
    }
  }
</script>

<style scoped>

  .container-fluid {
    /*margin-top: 5vh;*/
  }

</style>
