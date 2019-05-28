<template>
  <div class="container-fluid">
    <app-the-search-control
      class="container-fluid"
      :showFull="searchBarEnlarged"
      @searchModeDemanded="switchSearchMode($event)"

    ></app-the-search-control>

    <component
      :class="fadeInAtEvent"
      :is="searchBarMode"
      @incipitParamsUpdated="routeEvent($event,'incipitParamsUpdated')"
      @startIncipitSearch="routeEvent($event,'startIncipitSearch')"
      @demandFullTextSearch="$emit('demandFullTextSearch',$event)"
    ></component>
  </div>
</template>

<script>
import TheSearchControl from './searchBar/TheSearchControl'
import TheSearchHelpText from './searchBar/TheSearchHelpText'
import TheIncipitSearch from './searchBar/TheIncipitSearch'
import TheFullTextSearch from './searchBar/TheFullTextSearch'
import TheFullTextIncipitSearch from './searchBar/TheFullTextIncipitSearch'

let timer;
export default {
  name: "TheSearchBar",
  components:{
    appTheSearchControl: TheSearchControl,
    appTheSearchHelpText: TheSearchHelpText,
    appTheIncipitSearch: TheIncipitSearch,
    appTheFullTextSearch: TheFullTextSearch,
    appTheFullTextIncipitSearch:TheFullTextIncipitSearch
  },
  props: {
    searchBarEnlarged: {
      type: Boolean
    }
  },
  data(){
    return {
      searchBarMode:'appTheIncipitSearch',
      fadeInAtEvent: 'hidden',  //blending in dynamic components
    }
  },
  watch: {
    searchBarEnlarged(newValue, oldValue) {
      let self = this;
      if(this.searchBarEnlarged){
        timer = setTimeout(_=>{
          self.fadeInAtEvent = 'animated once fadeIn'
        },100)
      } else {
        clearTimeout(timer)
        self.fadeInAtEvent = 'hidden'
      }
    }
  },
  methods: {
    switchSearchMode(searchMode){
      this.searchBarMode=searchMode
    },
    routeEvent(eventData,eventName){
      this.$emit('routed_' + eventName,eventData)
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  h4 {
    color: $secondaryColor;
    margin-top: 2em;
    font-style: normal;
  }

  p {
    color: $secondaryColor;
  }

  hr {
    border-color: $secondaryColor;
    margin-bottom: 0;
  }

  .coloredHr {
    background-color: $secondaryColor;
    padding-bottom: .25em;
  }

  label {
    color: $secondaryColor;
  }

  input {
    background-color: $primaryColor;
  }

  em {
    text-decoration: none;
    font-weight: 600;
  }

</style>
