<template>
  <div class="card text-center VoyantCard_container" v-if="isShown" :style="cardSize">
    <div class="card-header">
      <button class="btn btn-link float-right" @click="removeCard">Close</button>
      <button class="btn btn-link float-right" @click.prevent="resizeCard('400px', '600px')">Klein</button>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a @click="currentView = 'Wortwolke'" :class="currentView==='Wortwolke' ? 'active' : ''" class="nav-link" href="#">Wortwolke</a>
        </li>
        <li class="nav-item">
          <a @click="currentView = 'Balkendiagramm'" :class="currentView==='Balkendiagramm' ? 'active' : ''" class="nav-link" href="#">Balkendiagramm</a>
        </li>
        <li class="nav-item">
          <a @click="currentView = 'Liniendiagramm'" :class="currentView==='Liniendiagramm' ? 'active' : ''" class="nav-link" href="#">Liniendiagramm</a>
        </li>
        <li class="nav-item">
          <a @click="currentView = 'Kreisdiagramm'" :class="currentView==='Kreisdiagramm' ? 'active' : ''" class="nav-link" href="#">Kreisdiagramm</a>
        </li>
        <li class="nav-item">
          <a @click="currentView = 'Netzdiagramm'" :class="currentView==='Netzdiagramm' ? 'active' : ''" class="nav-link" href="#">Netzdiagramm</a>
        </li>
        <li class="nav-item">
          <a @click="currentView = 'Punktwolke'" :class="currentView==='Punktwolke' ? 'active' : ''" class="nav-link" href="#">Punktwolke</a>
        </li>
      </ul>
    </div>
    <!--<iframe class="card-img-top" src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>-->
    <div class="card-body" v-if="!resultDataDisplayed">
      <!--<iframe class="card-img" :src=iframeVoyantUrl></iframe>-->
      <app-word-cloud
        v-if="currentView ==='Wortwolke'"
        :data="Object.assign([], linkedResult.mostFrequentLemmatas)"
        nameKey="name"
        valueKey="value"
        :color="undefined"
        :showTooltip="true"
        :rotate="{from: 0, to: 90, numOfOrientation: 2 }"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : ''"
      ></app-word-cloud>
      <app-bar-chart
        v-if="currentView==='Balkendiagramm'"
        :chartData="barData"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'"
      ></app-bar-chart>
      <app-line-chart
        v-if="currentView==='Liniendiagramm'"
        :chartData="barData"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'"
      ></app-line-chart>
      <app-pie-chart
        v-if="currentView==='Kreisdiagramm'"
        :chartData="barData"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'"
      ></app-pie-chart>
      <app-radar-chart
        v-if="currentView==='Netzdiagramm'"
        :chartData="barData"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'"
      ></app-radar-chart>
      <app-bubble-chart
        v-if="currentView==='Punktwolke'"
        :chartData="bubbleData"
        :style="(cardSize['min-width'] === '100%  !important') ? 'height: 600px' : 'height: 400px'"
      ></app-bubble-chart>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <h5 class=".d-inline">{{ linkedResult.lo.text }}</h5>
      <a href="#" class="btn btn-light">Zu den Forschungsdaten</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('100%', '100vh')">Größer</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('400px', '600px')">Kleiner</a>

    </div>
  </div>

</template>

<script>
    import {EventBus} from "../main";
    import wordcloud from 'vue-wordcloud'
    import BarChart from '../../../cantus_advancedSearch/src/components/result/compare/charts/BarChart'
    import LineChart from '../../../cantus_advancedSearch/src/components/result/compare/charts/LineChart'
    import PieChart from '../../../cantus_advancedSearch/src/components/result/compare/charts/PieChart'
    import RadarChart from '../../../cantus_advancedSearch/src/components/result/compare/charts/RadarChart'
    import BubbleChart from '../../../cantus_advancedSearch/src/components/result/compare/charts/BubbleChart'


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
      props: ['linkedResult'],
      data(){
        return {
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

<style scoped lang="scss">
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
</style>
