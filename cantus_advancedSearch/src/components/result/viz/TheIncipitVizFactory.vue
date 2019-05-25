<template>
  <div class="TheIncipitVizFactory_mainContainer container-fluid">
    <div v-if="incipitViewToShow==='incipitHistoViz'">
      <app-bar-chart
        :chartData="refHistoVizData"
      ></app-bar-chart>
      <app-line-chart
        :chartData="refHistoVizData"
      ></app-line-chart>
    </div>
    <div v-if="incipitViewToShow==='incipitTable'">
      <app-compare-list
        :arrayToLoop="incipitListData">
      </app-compare-list>

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
    </div>
  </div>
</template>

<script>

  //TODO correct component folder strucutre/hierarchy

  //array is needed for the incipitVizHistory to work
  //see inside incipitChartData watcher
  let array = []

  import TheResultPreview from './../compare/TheResultPreview'
  import BarChart from './../compare/charts/BarChart'
  import LineChart from '../compare/charts/LineChart'
  import VCompareList from './VCompareList'

  export default {
    name: "TheIncipitVizFactory",
    components:{
      appTheResultPreview:TheResultPreview,
      appBarChart: BarChart,
      appLineChart:LineChart,
      appCompareList:VCompareList
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
      },
      incipitViewToShow: {
        default:'incipitTable', //or incipitHistoViz
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
          labels:[this.incipitSearch.searchParams.chosenGenre.text, 'Rest'],
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
          let singleLabel = `${dp.searchParams.chosenLO.text}, ${dp.searchParams.chosenGenre.text}, ${dp.searchParams.chosenTimeFrame.text},${dp.searchParams.chosenHora.text}`
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
        let array = []
        for (let incipitSearch of this.incipitSearchHistory){
          let innerArray = []


          let loNameObj = this.shortenLOPid(incipitSearch.searchParams.chosenLO.value)
          let loTrad = loNameObj.refName
          let loVariant = loNameObj.variant ? loNameObj.variant : ''

          innerArray.push({
            val:`LO: ${loTrad} (${loVariant})`,
            type:'header'
          })
          innerArray.push({
            val:`Zeitraum: ${incipitSearch.searchParams.chosenTimeFrame.text}`,
            type:'subHeader'
          })
          innerArray.push({
            val:`Hora: ${incipitSearch.searchParams.chosenHora.text}`,
            type:'subHeader'
          })
          innerArray.push({
            val:`Genre: ${incipitSearch.searchParams.chosenGenre.text}`,
            type:'subHeader'
          })

          for (let result of incipitSearch.response.body) {
            let objToPush = {
              val:result.incipit,
              href:result.i
            }
            innerArray.push(objToPush)
          }
          array.push(innerArray)
        }
        return array
      }
    },
    watch: {
      incipitChartData: {
        immediate: true,  //needed to fire watcher at first data change
        handler(val){
          array.push(val)
          //needs to be done that way -> otherwise reference will be lost
          //and this.incipitVizHistory will recreate on each call
          this.incipitVizHistory = array
          console.log(array.length)
        }
      }
    },
    methods: {
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      shortenLOPid(loPID){
        let refName = loPID.replace('o:cantus.','')
        let splitArr = refName.split('.')
        refName = splitArr[0].charAt(0).toUpperCase() + splitArr[0].slice(1);
        if(splitArr.length===1)return [refName]

        let variant = splitArr[1].replace('.','|')
        return {refName:refName,variant:variant}
      }
    }
  }
</script>

<style scoped lang="scss">


</style>
