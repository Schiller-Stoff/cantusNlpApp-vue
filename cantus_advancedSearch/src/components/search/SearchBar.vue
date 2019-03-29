<template>
  <div class="container-fluid">

    <div>
      <div><i class="fas fa-volleyball-ball"></i></div>
    </div>

    <hr>

    <h3 :class="fadeInAtEvent">Wilkommen zur erweiterten Suche von Cantus</h3>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

    <hr>


    <h5 :class="fadeInAtEvent">Responsorien</h5>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
    <form class="inline" :class="fadeInAtEvent">
      <label for="inlineFormCustomSelectPref"></label>
      <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </form>

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
      self.fadeInAtEvent = 'invisible'
    })

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  h3 {
    color: $primaryColor;
    margin-top: 2em;
  }

  i {
    color: white;
    font-size: 1.5em;
    margin-top: 1em;
  }

  p {
    color: $primaryColor;
  }

  hr {
    background-color: $primaryColor
  }

  label {
    color: $primaryColor;
  }

  input {
    background-color: $primaryColor;
  }

</style>
