<template>
  <div class="container-fluid">
    <h4>Incipit Suche</h4>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">LO</label>
      </div>
      <select v-model="chosenLO" class="custom-select" id="inputGroupSelect01">
        <option selected>Bitte wählen...</option>
        <option value="passau">PASSAU RESP.TEST</option>
        <option value="passau.ur">Passau Ur</option>
        <option value="passau.sp">Passau SP</option>
        <option value="FAIL_QUERY">MALFORMED_QUERY</option>
        <option value="/api/users?delay=5">DELAYED_RESPONSE_5sek</option>
        <option value="/api/users?delay=12">DELAYED_RESPONSE_12sek_error_displayed</option>


        <option value="salzburg.ur">Salzburg Ur</option>
        <option value="klosterneuburg.ur">Kosterneuburg Ur</option>
      </select>
    </div>

    <br>
    <div>
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
      </div>
      <select v-model="objectItem.text" @change="objectItem.value=assignTimeFrameNumbers(objectItem.text)"  class="custom-select" id="inputGroupSelect04">
        <option selected value="default">Bitte wählen...</option>
        <option value="weihnachten">Weihnachten</option>
        <option value="vorfastenzeit">Vorfastenzeit</option>
        <option value="fastenzeit">Fastenzeit</option>
        <option value="triduumSacrum">Triduum Sacrum</option>
        <option value="nachOstern">Nachostern</option>
        <option value="pfingsten">Pfingsten</option>
        <option value="sonntageNachPfingsten">Sonntage nach Pfingsten</option>
        <option value="communeSanctorum">Commune Sanctorum</option>
        <option value="adventSonntage">Adventsonntage</option>
        <option value="adventQuatember">Adventquatember</option>
        <option value="zeitImKirchenJahr">Zeit im Kirchenjahr</option>
      </select>
    </div>
    <div>
      <p>...<em>einzelnes Fest</em>.</p>
      <app-model-select :options="autoCompleteOptions" v-model="objectItem"></app-model-select>
      <br>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect03">Hora</label>
      </div>
      <select v-model="chosenHora" class="custom-select" id="inputGroupSelect03">
        <option selected value="default">Bitte wählen...</option>
        <option value="C">Completorium (C)</option>

        <option value="L">Laudes (L)</option>
        <option value="M">Matutinae (M)</option>
        <option value="MI">Missa (MI)</option>
        <option value="N">Nona (N)</option>

        <option value="P">Prima (P)</option>
        <option value="PRO">Prozessio (PRO)</option>
        <option value="S">Sexta (S)</option>

        <option value="T">Tertia (T)</option>
        <option value="V">Vespera-1 (V)</option>
        <option value="V2">Vespera-2 (V2)</option>



      </select>
    </div>
    <br>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Genre</label>
      </div>
      <select v-model="chosenGenre" class="custom-select" id="inputGroupSelect02">
        <option selected value="default">Bitte wählen...</option>
        <option value="AB">AB - Antiphon zum Benedictus</option>
        <option value="AC">AC - Antiphon zur Commemoratio bzw. ad suffragium</option>
        <option value="AD">AD - Antiphon zum Nunc dimittis</option>
        <option value="AE">AE - Cantica-Antiphon (Evangelium)</option>
        <option value="ALV">ALV - Alleluia-Vers</option>
        <option value="AM">AM - Antiphon zum Magnificat</option>
        <option value="AN">AN - Antiphon</option>
        <option value="AP">AP - Prozessionsantiphon</option>
        <option value="AS">AS - Marianische Schlussantiphon</option>

        <option value="CO">CO - Communio</option>
        <option value="CP">CP - Capitulum</option>

        <option value="EP">EP - Epistel</option>
        <option value="EPP">EPP - Epistel aus den Propheten</option>
        <option value="EV">EV - Evangelium</option>

        <option value="GR">GR - Graduale</option>

        <option value="HY">HY - Hymnus</option>

        <option value="IN">IN - Introitus</option>
        <option value="INV">INV - Invitatorium</option>

        <option value="LE">LE - Lectio (AT/NT)</option>
        <option value="LH">LH - Homilie als Lectio</option>
        <option value="LHI">LHI - Lectio aus Historia, Vita, Passio, Legenda</option>
        <option value="LS">LS - Sermo als Lectio</option>

        <option value="OF">OF - Offertorium</option>

        <option value="PR">PR - Prosa</option>
        <option value="PS">PS - Psalm</option>

        <option value="RB">RB - Responsorium breve</option>
        <option value="RP">RP - Responsorium prolixum</option>
        <option value="RPP">RPP - Prozessionsresponsorium</option>

        <option value="SE">SE - Sequenz</option>
        <option value="TP">TP - Tropus</option>
        <option value="TR">TR - Tractus</option>
        <option value="VIS">VIS - Visitatio sepulchri</option>
        <option value="VS">VS - Versikel</option>

      </select>
    </div>

    <br>

    <button
      class="btn btn-primary" @click="initSearch">Suche starten
    </button>


    <br>

    <br>
    <br>
  </div>

</template>

<script>
  import { ModelSelect } from 'vue-search-select'
  import {autocompleteVals} from "../../../data/autocompleteVals"
  import {timeFrames} from '../../../data/timeFrameFeasts'

  export default {
    name: "TheIncipitSearch",
    components: {
      appModelSelect: ModelSelect,
    },
    data(){
      return {
        chosenLO:'passau.ur',
        chosenGenre:'RP',
        chosenHora:'M',
        chosenFeasts:'weihnachten',

        objectItem:{
          text:'',
          value:''
        },
        autoCompleteOptions:autocompleteVals,
        timeFrames
      }
    },
    computed: {
      incipitSearchParams(){

        let params = {
          chosenLO: this.chosenLO,
          chosenGenre: this.chosenGenre,
          chosenHora: this.chosenHora,
          chosenFeasts:'',

          //chosenFeastNumbers are above?
          chosenTimeFrameName:this.objectItem.text,
          chosenTimeFrameNumber:this.objectItem.value
        }




        // chosen Feasts is can be multiple feasts (from one dropdown) OR
        // just one (selected via the other dropdown)
        let selTimeFrame = this.timeFrames[this.chosenFeasts]
        params.chosenFeasts = selTimeFrame ? selTimeFrame : this.chosenFeasts

        return params
      }
    },
    watch: {
      incipitSearchParams(){
        this.$emit('incipitParamsUpdated',this.incipitSearchParams)
      }
    },
    methods: {
      initSearch(){
        this.$emit('startIncipitSearch')
      },
      assignTimeFrameNumbers(timeFrameName){
        let number = this.timeFrames[timeFrameName]
        if(number)return number
      }
    }
  }
</script>

<style scoped>

</style>
