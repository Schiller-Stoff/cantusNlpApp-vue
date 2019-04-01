<template>
  <div class="container-fluid">

    <div>
      <div class="searchBar_iconHolder"><i class="fas fa-home"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="far fa-window-maximize"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-lock"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-unlock"></i></div>
    </div>

    <hr>
    <br>
    <h4 :class="fadeInAtEvent">Wilkommen zur erweiterten Suche von Cantus</h4>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

    <hr class="coloredHr" :class="fadeInAtEvent">

    <br>
    <h5 :class="fadeInAtEvent">Responsorien</h5>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">LO</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01">
        <option selected>Bitte wählen...</option>
        <option value="1">Passau</option>
        <option value="2">Salzburg</option>
        <option value="3">Regensburg</option>
      </select>
    </div>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Responsorien</label>
      </div>
      <select class="custom-select" id="inputGroupSelect02">
        <option selected>Bitte wählen...</option>
        <option value="1">RP</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <button class="btn btn-secondary" :class="fadeInAtEvent">Zeige Ergebnisse</button>
  </div>
</template>

<script>
import {EventBus} from "../../main";

export default {
  name: "Search",
  data(){
    return {
      fadeInAtEvent: 'd-none'
    }
  },
  created(){
    let self = this;
    EventBus.$on('searchBarEnlarge',_=>{
      self.fadeInAtEvent = 'animated once fadeIn'
    })

    EventBus.$on('searchBarMinified',_=>{
      self.fadeInAtEvent = 'd-none'
    })

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  h4 {
    color: $primaryColor;
    margin-top: 2em;
  }

  .searchBar_iconHolder {
    display: inline-block;
  }

  i {
    color: white;
    font-size: 1.5em;
    margin-top: 1em;
    margin-right: .75em;
  }

  p {
    color: $primaryColor;
  }

  hr {
    background-color: $primaryColor;
  }

  .coloredHr {
    background-color: $fourthColor;
    padding-bottom: .25em;
  }

  label {
    color: $primaryColor;
  }

  input {
    background-color: $primaryColor;
  }

</style>
