<template>
  <div class="TheIncipitVizFactory_mainContainer">
    <div v-if="!showTable">
      <app-bar-chart
        :chartData="refHistoVizData"
      ></app-bar-chart>
      <app-line-chart
        :chartData="refHistoVizData"
      ></app-line-chart>
    </div>
    <div v-else class="TheIncipitVizFactory_incipitCointainer">
      <!--<v-client-table :data="incipitTableData" :columns="tableOptions.columns" :options="tableOptions.options">
        <a slot="Fest" slot-scope="props" class="fa fa-edit" :href="props.row.Uri">
          {{props.row.Fest}}
        </a>
        <a slot="Incipits" slot-scope="props" class="fa fa-edit" :href="props.row.i">
          {{props.row.Incipits}}
        </a>
        <a slot="Hora" slot-scope="props" class="fa fa-edit" :href="props.row.o">
          {{props.row.Hora}}
        </a>
      </v-client-table>-->

      <ul class="TheIncipitVizFactory_mainUl list-group list-inline">
        <li class="TheIncipitVizFactory_outerLi list-group-item" v-for="incipitSearch in incipitSearchHistory">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(result,index) in incipitSearch.response.body"
              :class="index===0 ? 'active' : ''"
            >
              <a :href="index===0 ? '' : result.i" :style="index===0 ? 'text-decoration:none;color:white' : ''">
                {{ index!==0 ? (result.incipit) : `${incipitSearch.searchParams.chosenLO}/${incipitSearch.searchParams.chosenGenre}` }}
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <!--<ul class="list-group" v-for="incipitSearch in incipitSearchHistory">
        <li class="list-group-item" v-for="result in incipitSearch.response.body">{{ result.incipit }}</li>
      </ul>-->

    </div>
    <button class="btn btn-primary" @click="toggleTable">switch</button>
  </div>
</template>

<script>

  //TODO correct component folder strucutre/hierarchy
  //TODO Use ul or plain table to visualize incipit results

  import TheResultPreview from './../compare/TheResultPreview'
  import BarChart from './../compare/charts/BarChart'
  import LineChart from '../compare/charts/LineChart'

  export default {
    name: "TheIncipitVizFactory",
    components:{
      appTheResultPreview:TheResultPreview,
      appBarChart: BarChart,
      appLineChart:LineChart
    },
    props:{
      incipitSearch:{
        required:true
      },
      incipitOngoingSearch:{
        required:true
      },
      incipitSearchFailed:{
        required:true
      },
      incipitSearchHistory: {
        required:true
      }
    },
    data(){
      return {
        incipitVizHistory:[],
        showTable:false,
        tableOptions: {
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
              noResults:"Leider keine Ergebnisse",
              filterBy:"Filter by {column}",
              loading:'Laden...',
              defaultOption:'Select {column}',
              columns:'Spalten'
            }
          },
        },
      }
    },
    computed: {
      incipitDiagramData(){
        let resultCount = this.incipitSearch.response.body.length
        return {
          label:'Incipits',
          backgroundColor: [this.randomColor()],
          data: [resultCount]
        };
      },
      incipitChartData(){
        return {
          labels:[this.incipitSearch.searchParams.chosenGenre, 'Rest'],
          datasets: [this.incipitDiagramData],
          searchParams:this.incipitSearch.searchParams
        }
      },
      refHistoVizData(){
        let obj = {
          labels: [],
          datasets: []
        }

        let dataObj = {
          label:'',
          backgroundColor:[],
          data: []
        }

        for (let dp of this.incipitVizHistory){
          dataObj.label = "Incipits";
          let timeFrame = dp.searchParams.chosenFeast === "default" ? dp.searchParams.chosenTimeFrame : dp.searchParams.chosenFeast    // default behavior controlled by method timespanOrFeast
          let singleLabel = `${dp.searchParams.chosenLO}, ${dp.searchParams.chosenGenre}, ${timeFrame}`
          obj.labels.push(singleLabel)
          dataObj.backgroundColor.push(dp.datasets[0].backgroundColor[0])
          dataObj.data.push(dp.datasets[0].data[0])
        }
        obj.datasets.push(dataObj)

        return obj;

      },
      incipitTableData(){
        let refined = []
        for (let dataPoint of this.incipitSearch.response.body){
          refined.push({Fest: dataPoint.feastname,Hora:dataPoint.office, 'Gattungsbez':dataPoint.genre, Incipits:dataPoint.incipit,Referenz:dataPoint.r, Uri:dataPoint.feast, i:dataPoint.i, o:dataPoint.o })
        }
        return refined;
      },
      incipitListData(){



        return []
      }
    },
    watch: {
      incipitSearchHistory:{
        deep:true,
        handler(){
          this.incipitVizHistory.push(this.incipitChartData)
          console.log(this.incipitVizHistory)
        }
      }
    },
    methods: {
      toggleTable(){
        return this.showTable = !this.showTable
      },
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    }
  }
</script>

<style scoped lang="scss">

  .TheIncipitVizFactory_outerLi {
    vertical-align: top;
  }

  .TheIncipitVizFactory_mainUl {
    width: 1000em;
  }

  .TheIncipitVizFactory_incipitCointainer {
    overflow-x: auto;
  }

</style>
