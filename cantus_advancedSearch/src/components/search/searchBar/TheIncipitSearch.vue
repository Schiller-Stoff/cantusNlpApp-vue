<template>
  <div class="container-fluid">
    <h4>Incipit Suche</h4>

    <app-v-librii-ordinarii-select v-model="chosenLO"></app-v-librii-ordinarii-select>

    <br>

    <div>
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>

    <app-v-time-frame-select v-model="objectItem"></app-v-time-frame-select>


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
  import VLibriiOrdinariiSelect from "./dropdowns/VLibriiOrdinariiSelect"
  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'

  export default {
    name: "TheIncipitSearch",
    components: {
      appModelSelect: ModelSelect,
      appVLibriiOrdinariiSelect: VLibriiOrdinariiSelect,
      appVTimeFrameSelect: VTimeFrameSelect
    },
    data(){
      return {
        chosenLO:'o:cantus.passau.ur',
        chosenGenre:'RP',
        chosenHora:'M',

        // inside here are objectItem.text = chosenTimeFrameName AND objectItem.value = chosenTimeFrameNumber!!
        // necessary because of plugin
        objectItem:{
          text:'weihnachten',
          value:'"02122400" "02122500" "02122600" "02122700" "02122800" "05010600"'
        },
        autoCompleteOptions:autocompleteVals
      }
    },
    computed: {
      incipitSearchParams(){
        return {
          chosenLO: this.chosenLO,
          chosenGenre: this.chosenGenre,
          chosenHora: this.chosenHora,
          chosenTimeFrameName:this.objectItem.text,
          chosenTimeFrameNumber:this.objectItem.value
        }
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
      }
    }
  }
</script>

<style scoped>

</style>
