<template>
  <div>
    <h4>Erweiterte Volltextsuche</h4>
    <app-time-frame-or-feast-select
      v-model="chosenTimeFrame"
      :searchFieldsShown="false"
    ></app-time-frame-or-feast-select>

    <hr>
    <div>
      <br>
      <app-horae-select
        v-model="chosenHora"
        :search-toggable="true"
        @searchFieldToggled="horaeSearchActive = $event"
      ></app-horae-select>
    </div>

    <br>
    <p>FullTextUrl:</p>
    <p>{{fullTextUrl}}</p>

  </div>
</template>

<script>
  //TODO add incipit query etc.
  //TODO think about: better to let user add further fields???? --> might be much easier to implement!
  // -> because then -> as field is added the query will behave differently!

  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import VTimeFrameOrFeastSelect from './dropdowns/VTimeFrameOrFeastSelect'


  export default {
    name: "TheFullTextSearch",
    components: {
      appVTimeFrameSelect:VTimeFrameSelect,
      appHoraeSelect:VHoraeSelect,
      appTimeFrameOrFeastSelect: VTimeFrameOrFeastSelect
    },
    data(){
      return {
        urlStart:`https://gams.uni-graz.at/archive/objects/`,

        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:'',

        horaeSearchActive:false,
        timeFrameSearchActive:false


      }
    },
    computed: {
      fullTextUrl(){
        if(this.horaeSearchActive && !this.timeFrameSearchActive){
          /*let queryObject = 'query.cantus.FULLTEXT_ONLY_FEAST'

          let queryStart = `${this.urlStart + queryObject}/methods/sdef:Query/get?params=`
          let params = `$4|${this.chosenTimeFrame.value}`

          let url = queryStart + encodeURI(params)
          return url*/

        }


        let buildQuery = `${this.urlStart}`

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
