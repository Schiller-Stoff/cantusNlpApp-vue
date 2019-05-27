<template>

  <div class="container-fluid" id="TheResultDefault_mainContainer">
    <h2>Cantus Erweiterte Suche</h2>
    <hr>
    <br>
    <div v-if="!showFullContent" class="ResultDefault_iconHolder">
      <i class="fas fa-arrow-circle-left"></i>
      <p>Bewegen Sie die Maus über die Leiste Links um eine Suchauswahl zu treffen.</p>
    </div>

    <transition enter-active-class="animated fadeIn">
      <div v-if="showFullContent" id="TheResultDefault_contentContainer">
        <div class="ResultDefault_iconHolder">
          <i class="fas fa-arrow-circle-left" id="firstArrow"></i>
          <p>Wählen Sie zuerst in der oberen Leiste einen Suchtyp. Es steht eine Volltextsuche, eine Volltextsuche basierend auf Incipits und eine
          erweiterte Incipitsuche zu Verfügung</p>
        </div>
        <div class="ResultDefault_iconHolder">
          <i class="fas fa-arrow-circle-left"></i>
          <p>...standardmäßig wird zunächst der Beschreibungstext für die Suchfunktionalitäten angezeigt, wo weitere Auskunft über die Suchfunktionalitäten
          und über das erwartete Ergebnis gegeben wird.</p>
          <p>Nachdem ein Suchtyp gewählt wurde werden in der Leiste links diverse Auswahllisten eingeblendet mit denen die jeweilige Suche eingeschränkt werden kann.</p>
        </div>
        <br>
        <br>
        <hr>
      </div>
    </transition>

  </div>
</template>

<script>
  let timer;
  import {mapGetters} from 'vuex'
  export default {
    name: "TheResultDefault",
    data(){
      return {
        showFullContent:false
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState'
      })
    },
    watch: {
      searchBarEnlarged(newValue, oldValue) {
        if(this.searchBarEnlarged){
          if(this.showFullContent)return;
          timer = setTimeout(_=>{
            this.showFullContent = true;
          },300)
        } else {
          if(!this.showFullContent)return clearTimeout(timer);
          this.showFullContent = false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/globalVariables/globalVariables.scss";


  h2 {
    margin-top: 1.5em;
    font-style: normal;
    text-align: center;
  }

  hr {
    border: none;
    padding:.25em;
    background-color: lightgrey;
    border-radius: 5em;
    width: 40%;
  }


  .ResultDefault_iconHolder {
    padding: 0 2em;
    i {
      color: $secondaryColor;
      font-size: 3em;
      margin: .75em .75em .5em 0;
    }
    i,p {display: inline-block;text-align: justify}
  }

  #TheResultDefault_contentContainer {
    padding: 0 2em;
    border: .25em solid $primaryColor;
    border-radius: 1em;
  }

  #firstArrow {
    transform: rotate(20deg);
  }

  #TheResultDefault_mainContainer {
    border-right: .5em $primaryColor dashed;
  }

</style>
