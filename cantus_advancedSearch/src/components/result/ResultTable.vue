<template>
    <div class="container-fluid" :class="delayedDisplay">
      <h2>LO {{searchParams.chosenLO}}</h2>
      <p>{{timespanOrFeast}}</p>
      <p>Genre: {{ searchParams.chosenGenre}}</p>
      <hr>
      <br>
      <br>
      <v-client-table :data="refinedTableData" :columns="columns" :options="options">
        <a slot="Fest" slot-scope="props" class="fa fa-edit" :href="props.row.Uri">
          {{props.row.Fest}}
        </a>
        <a slot="Incipits" slot-scope="props" class="fa fa-edit" :href="props.row.i">
          {{props.row.Incipits}}
        </a>
        <a slot="Hora" slot-scope="props" class="fa fa-edit" :href="props.row.o">
          {{props.row.Hora}}
        </a>
      </v-client-table>
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
        columns: ['Fest','Hora', 'Gattungsbez', 'Incipits','Referenz'],
        options: {
          // see the options API
          texts: {
            count:"Zeige {from} bis {to} von {count} Zeilen|{count} allen Zeilen|Einer Zeile",
            first:'Erste',
            last:'Letzte',
            filter:"Filtern:",
            filterPlaceholder:"Suche",
            limit:"Zeilen:",
            page:"Page:",
            noResults:"Leider keine Ergebnisse gefunden",
            filterBy:"Filter by {column}",
            loading:'Laden...',
            defaultOption:'Select {column}',
            columns:'Spalten'
          }
        },
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
          refined.push({Fest: dataPoint.feastname,Hora:dataPoint.office, 'Gattungsbez':dataPoint.genre, Incipits:dataPoint.incipit,Referenz:dataPoint.r, Uri:dataPoint.feast, i:dataPoint.i, o:dataPoint.o })
        }
        return refined;
      },
      timespanOrFeast(){
        let feast = this.searchParams.chosenFeast
        if(feast==='default'){
          return "Gewählter Zeitraum: " + this.searchParams.chosenTimeFrame
        } else {
          return "Gewähltes Fest: " + feast
        }
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
    methods: {
      onRowClick(event){

        // example for handling clicks here via js

        //console.log(event)
        //console.log(event.row.Uri)
        //confirm("Zur Seite wechseln?")
        //window.location.href = `${event.row.Uri}`
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
