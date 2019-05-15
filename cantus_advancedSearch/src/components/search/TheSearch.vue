<template>
  <div>
    <app-the-search-bar
      @routed_startIncipitSearch="searchIncipit()"
      @routed_incipitParamsUpdated="saveIncipitSearchData($event)"
      :searchBarEnlarged="searchBarEnlarged"
    ></app-the-search-bar>
  </div>
</template>

<script>
  //TODO reduce param to only work with incipitSearch!

  import {incipitDummyDataMixin} from './../../mixins/incipitDummyData' //TODO remove when not longer needed

  import TheSearchBar from './TheSearchBar'

  let incipitSearchTimer;

  export default {
    name: "TheSearch",
    mixins: [incipitDummyDataMixin],  //TODO remove when no longer needed
    components: {
      appTheSearchBar: TheSearchBar
    },
    props: {
      searchBarEnlarged: {
        type: Boolean
      }
    },
    data(){
      return {
        // settings data
        urlStart:'https://glossa.uni-graz.at/archive/objects',
        useDummyData:true,

        // used class variables
        // variables used via incipitSearch -> passed to vuex
        incipitSearchParams: {
          chosenLO: '',
          chosenGenre: '',
          chosenHora: '',
          chosenTimeFrame: '',
          chosenFeast:''
        },

        //TODO use this object instead of above
        incipitSearch:{
          response:this.incipitSearchResponse,
          query:'',
          searchParams:{
            chosenLO: '',
            chosenGenre: '',
            chosenHora: '',
            chosenTimeFrame: '',
            chosenFeast:''
          }
        }
      }
    },
    computed: {
      incipitQuery(val){
        if(val===undefined)return;
        let queryStart = `${this.urlStart}/query:cantus.genres/methods/sdef:Query/getJSON?params=`
        let queryParams =
          `$1|<https://gams.uni-graz.at/o:cantus.${this.incipitSearchParams.chosenLO}>;` +
          `$2|${this.incipitSearchParams.chosenGenre};` +
          `$3|${this.incipitSearchParams.chosenHora};` +
          `$4|${this.incipitSearchParams.chosenFeasts}`

        return this.encodeUri(queryStart + queryParams)
      }
    },
    methods: {
      saveIncipitSearchData(data){
        console.debug('saveIncipitSearchData...')
        this.incipitSearchParams = data
        this.$store.dispatch('incipit_setSearchParamsAction',data)
      },
      searchIncipit(){
        this.$store.dispatch('incipit_setSearchFailedAction',false)
        this.$store.dispatch('incipit_markOngoingSearchAction', true)

        //only accessed when no real ajax, just test data should be applied
        if(this.useDummyData){
          let response = {}
          response.body = this.testIncipitSearch()
          this.$store.dispatch('incipit_setSearchResultAction',response)
          this.$store.dispatch('incipit_pushOntoSearchHistoryAction',{response:response, searchParams:this.incipitSearchParams})
          this.$store.dispatch('incipit_markOngoingSearchAction', false)
          return;
        }

        //if in 10 secs no response fail
        incipitSearchTimer = setTimeout(_=>{
          this.$store.dispatch('incipit_setSearchFailedAction',true)
          this.runningRequest.abort()
        },10000)

        //let vuexSearchQuery = this.$store.getters.search_getCurSearchQuery
        this.$http.get(this.incipitQuery, {
          //vue resource specific: using above to cancel current request
          before(request){
            this.runningRequest = request
          }
        }).then(response => {
          this.$store.dispatch('incipit_setSearchResultAction',response)
          this.$store.dispatch('incipit_pushOntoSearchHistoryAction',{response:response, searchParams:this.incipitSearchParams})
          clearTimeout(incipitSearchTimer)
          console.info('Response received:')
          console.info(response)
        },err => {
          this.$store.dispatch('incipit_setSearchFailedAction',true)
          clearTimeout(incipitSearchTimer)
        }).finally(_=>{
          this.$store.dispatch('incipit_markOngoingSearchAction', false)
        });
      },
      encodeUri(uri){
        return encodeURI(uri)
      }
    }
  }
</script>

<style scoped>

</style>
