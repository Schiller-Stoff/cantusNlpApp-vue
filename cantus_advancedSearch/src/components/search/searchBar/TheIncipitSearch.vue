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

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect03">Genre</label>
      </div>
      <select v-model="chosenGenre" class="custom-select" id="inputGroupSelect03">
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
    <div>
      <!--<h4>Zeitraum oder Fest</h4>-->
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <!--<label class="input-group-text" for="inputGroupSelect02">Zeitraum</label>-->
      </div>
      <select v-model="curQueryObject" class="custom-select" id="inputGroupSelect02">
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


    <!--<h4>Query for Zeiträume AND Einzelfeste</h4>-->
    <!--<p :class="fadeInAtEvent">{{blazeGraphQuery}}</p>-->

    <!--<h4>Data Query for the "vergleichende Visualisierung"</h4>-->
    <!--<p>{{dataQuery}}</p>-->
    <div>
      <p>...<em>einzelnes Fest</em>.</p>
      <app-model-select :options="autoCompleteOptions" v-model="selectedFeast"></app-model-select>
      <br>
      <button @click.prevent="searchResp(chosenGenre);searchVizCompareData('viz_setVizCompareDataAction')" class="btn btn-primary">Suche starten</button>
    </div>
    <br>

    <br>
    <br>
  </div>

</template>

<script>
    export default {
        name: "TheIncipitSearch"
    }
</script>

<style scoped>

</style>
