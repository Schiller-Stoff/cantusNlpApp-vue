<template>
  <div class="card text-center VoyantCard_container" v-if="isShown" :style="cardSize">
    <div class="card-header">
      <button class="btn btn-link float-right" @click="removeCard">Löschen</button>
      <button class="btn btn-link float-right" @click.prevent="toogleCardMaximized">{{cardMaximized ? 'Minimieren' : 'Maximieren'}}</button>
      <ul class="nav nav-tabs card-header-tabs">

        <li class="input-group nav-item mb-3" style="max-width: 250px;">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01"><i class="fas fa-chart-area"></i></label>
          </div>
          <select v-model="currentView" class="custom-select" id="inputGroupSelect01" style="background-color: rgba(0, 0, 0, 0.03); border: none">
            <option selected>Diagramm wählen...</option>
            <option value="Wortwolke">Wortwolke</option>
            <option value="Balkendiagramm">Balkendiagramm</option>
            <option value="Liniendiagramm">Liniendiagramm</option>
            <option value="Kreisdiagramm">Kreisdiagramm</option>
            <option value="Netzdiagramm">Netzdiagramm</option>
            <option value="Punktwolke">Punktwolke</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="card-body" v-if="!resultDataDisplayed">
      <app-word-cloud
        v-if="currentView ==='Wortwolke'"
        :data="Object.assign([], linkedResult.mostFrequentLemmatas)"
        nameKey="name"
        valueKey="value"
        :color="undefined"
        :showTooltip="true"
        :rotate="{from: 0, to: 90, numOfOrientation: 2 }"
        :style="maximizedSize"
      ></app-word-cloud>
      <app-bar-chart
        v-if="currentView==='Balkendiagramm'"
        :chartData="Object.assign([], barData)"
        :style="maximizedSize"
      ></app-bar-chart>
      <app-line-chart
        v-if="currentView==='Liniendiagramm'"
        :chartData="Object.assign([], barData)"
        :style="maximizedSize"
      ></app-line-chart>
      <app-pie-chart
        v-if="currentView==='Kreisdiagramm'"
        :chartData="Object.assign([], barData)"
        :style="maximizedSize"
      ></app-pie-chart>
      <app-radar-chart
        v-if="currentView==='Netzdiagramm'"
        :chartData="Object.assign([], barData)"
        :style="maximizedSize"
      ></app-radar-chart>
      <app-bubble-chart
        v-if="currentView==='Punktwolke'"
        :chartData="Object.assign([], bubbleData)"
        :style="maximizedSize"
      ></app-bubble-chart>
      <br>
      <h5 class=".d-inline">{{ linkedResult.lo.text }}</h5>
      <a :href="`${serverAndProtocol}/archive/objects/${linkedResult.lo.value}/datastreams/LEMMATA_OCCURENCES/content`" class="btn btn-light">Zu den Forschungsdaten</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('100%', '100vh')">Größer</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('400px', '600px')">Kleiner</a>

    </div>
  </div>

</template>

<script>
    import {EventBus} from "../main";
    import wordcloud from 'vue-wordcloud'
    import BarChart from './charts/BarChart'
    import LineChart from './charts/LineChart'
    import PieChart from './charts/PieChart'
    import RadarChart from './charts/RadarChart'
    import BubbleChart from './charts/BubbleChart'


    export default {
      name: "VoyantCard",
      components:{
        appWordCloud: wordcloud,
        appBarChart: BarChart,
        appLineChart:LineChart,
        appPieChart:PieChart,
        appRadarChart:RadarChart,
        appBubbleChart:BubbleChart
      },
      props:{
        linkedResult:{
          type:Object,
          required: true
        },
        serverAndProtocol:{
          type:String,
          required:true,
        }
      },
      data(){
        return {
          cardMaximized:false,
          currentView: "Wortwolke",
          isShown: true,
          resultDataDisplayed:false,
          cardSize: {
            "height": "600px",
            "min-width": "400px"
          }
        }
      },
      computed:{
        maximizedSize(){

          if(this.cardMaximized) return 'height: 70vh'

          return (this.cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'
        },
        barData(){
          let obj = {
            labels: [],
            datasets: []
          }

          let dataObj = {
            label:'',
            backgroundColor:[],
            data: []
          }

          for (let dp of this.linkedResult.mostFrequentLemmatas){
            dataObj.label = "Vorkommnisse";
            let singleLabel = ``
            obj.labels.push(dp.text)
            dataObj.backgroundColor.push(this.randomColor())
            dataObj.data.push(dp.value)
          }
          obj.datasets.push(dataObj)

          return obj;
        },
        bubbleData(){
          let obj = {
            labels: [],
            datasets: []
          }



          let xInc = 0
          for (let dp of this.linkedResult.mostFrequentLemmatas){
            let dataObj = {
              label:'',
              backgroundColor:[],
              data: []
            }
            dataObj.label = dp.name;
            let singleLabel = ``
            //obj.labels.push(dp.text)
            dataObj.backgroundColor.push(this.randomColor())
            dataObj.data.push({x:xInc, y:dp.value, r:dp.value/100})
            obj.datasets.push(dataObj)
          }


          return obj;
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
        removeCard(){
          EventBus.$emit('removeCard', this.linkedResult)
        },
        resizeCard(width, height = null){
          console.log("resize!")
          this.cardSize = {
            "min-width": width + "  !important",
            "height": (height!==null) ? (height + " !important") : this.cardSize["height"]
          }
          console.log(this.cardSize);
        },
        toogleCardMaximized(){
          this.cardMaximized = !this.cardMaximized
          if(this.cardMaximized){
            this.cardSize = {position:'fixed', height:'120vh', width: '100vw', left:0, top:0, overflow:'scroll',zIndex:'2000'}
          } else {
            this.cardSize = {"height": "600px", "min-width": "400px"}
          }

        }


      },
      created(){
        EventBus.$on("deleteAll",()=>{
          this.removeCard();
        });

        EventBus.$on("allViewChange",(view)=>{
          this.currentView = view
        });

        EventBus.$on("resizeCards", (cssSizeObj)=>{
          this.resizeCard(cssSizeObj["min-width"], cssSizeObj["height"]);
        });

      }
    }
</script>

<style lang="scss">
  @import "../scss/globalVariables.scss";

  .VoyantCard_container {
    display: inline-block;
  }

  .VoyantCard_container {
    margin: .05em !important;
    padding: .05em !important;
    min-width: 400px !important;
    .card-header {margin-bottom: .1em !important;}
    .card-body {margin: 0;}
    h5 {font-weight: 900; color: black}
    iframe {
      padding: 0;
      width: 100% !important;
      min-height: 400px !important;
      height: 80% !important;
      border: none;
    }
  }

  // tooltip wordcloud
  div.tooltip {
    z-index: 1000000;
  }
</style>
