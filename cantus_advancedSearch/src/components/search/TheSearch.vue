<template>
  <div>
    <app-the-search-bar
      @routed_startIncipitSearch="logToConsole($event);searchIncipit()"
      @routed_incipitParamsUpdated="logToConsole($event);saveIncipitSearchData($event)"
      :searchBarEnlarged="searchBarEnlarged"
    ></app-the-search-bar>

    <p>{{incipitQuery}}</p>

  </div>
</template>

<script>
  //TODO split functionality between TheSearch component (ajax /query building etc.) and TheSearchBar (gui etc.)
  //TODO repair labeling in the result display --- repair component structure etc.
  //TODO implement incipitSearch 1.Correctly display query in <p> 2.Implement correct ajax request 3.correct Vuex transfer to the result components

  import TheSearchBar from './TheSearchBar'
  let incipitSearchTimer;

  export default {
    name: "TheSearch",
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
        urlStart:'https://glossa.uni-graz.at/archive/objects',
        incipitSearchParams: {
          chosenLO: 'passau.ur',
          chosenGenre: 'RP',
          chosenHora: '',
          chosenTimeFrame: '',
          chosenFeast:'01013000'
        }
      }
    },
    computed: {
      incipitQuery(val){
        if(val===undefined)return;
        //this.$store.dispatch('search_setSearchParamsAction',searchParams)

        //testing failing query
        if(this.chosenLO==='FAIL_QUERY')return '9$$ß34'

        //for testing delayed respinse
        if(this.chosenLO==='/api/users?delay=5')return 'https://reqres.in/api/users?delay=5'
        if(this.chosenLO==='/api/users?delay=12')return 'https://reqres.in/api/users?delay=12'

        //for resp.test
        if(this.chosenLO==='passau') return `https://${this.server}/archive/objects/query:resp.test/methods/sdef:Query/getJSON?params=%241%7C${this.incipitSearchParams.chosenGenre}`;

        // return correct query
        // takes feasts numbers in "feasts" array and build correct SPARQL via string concatination
        // a UNION triple-statement
        // if(this.feasts.length > 1){
        //   let buildQuery = `https://${this.server}/archive/objects/query:cantus.genres/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.incipitSearchParams.chosenLO}%3E%3B%242%7C${this.incipitSearchParams.chosenGenre}%3B%243%7C`
        //   for (let i = 0; i < this.feasts.length; i++) {
        //     if(i===0){
        //       buildQuery += `%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.feasts[i]}%22%7D`
        //     } else {
        //       buildQuery += `%20UNION%20%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.feasts[i]}%22%7D`
        //     }
        //   }
        //   //this.$store.dispatch('search_modifyCurSearchQueryAction',buildQuery)
        //   return buildQuery
        // } else {
        //   let query = `https://${this.server}/archive/objects/query:cantus.genres/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.chosenLO}%3E%3B%242%7C${this.chosenGenre}%3B%243%7C%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.selectedFeast.value}%22%7D`
        //   //this.$store.dispatch('search_modifyCurSearchQueryAction',query)
        //   return query
        // }


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
      logToConsole(data){
        console.log("test method called!")
        console.log(data)
      },

      saveIncipitSearchData(data){
        console.debug('saveIncipitSearchData...')
        this.incipitSearchParams = data
        this.$store.dispatch('incipit_setSearchParamsAction',data)
      },
      searchIncipit(){
        this.$store.dispatch('search_setSearchFailedAction',false)
        this.$store.dispatch('incipit_markOngoingSearchAction', true)

        //if in 10 secs no response fail
        incipitSearchTimer = setTimeout(_=>{
          this.$store.dispatch('search_setSearchFailedAction',true)
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
          this.$store.dispatch('search_pushOntoSearchHistoryAction',{response:response, searchParams:this.incipitSearchParams})
          clearTimeout(incipitSearchTimer)
          console.info('Response received:')
          console.info(response)
        },err => {
          this.$store.dispatch('search_setSearchFailedAction',true)
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
