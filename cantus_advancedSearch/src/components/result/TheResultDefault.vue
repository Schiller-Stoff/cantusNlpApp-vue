<template>

  <div>
    <h2>Cantus Erweiterte Suche</h2>
    <hr>
    <div v-if="!showFullContent" class="ResultDefault_iconHolder">
      <i class="fas fa-arrow-circle-left"></i>
      <p>Bewegen Sie die Maus über die blaue Leiste Links um eine Suche zu starten.</p>
    </div>

    <transition enter-active-class="animated fadeIn">
      <div v-if="showFullContent">
        <div class="ResultDefault_iconHolder">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Wählen Sie ein Genre um .... lorem ipsum lalafas adsd dk asdd  lmsaf</p>
        </div>
        <div class="ResultDefault_iconHolder">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Bewegen Sie die Maus über die blaue Leiste Links um eine Suche zu starten.</p>
        </div>
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

  h2 {
    margin-top: .5em;
    font-style: normal;
  }

  .ResultDefault_iconHolder {
    i {
      color: #0047bb;
      font-size: 3em;
      margin: .75em .75em .5em 0;
    }
    i,p {display: inline-block;}
  }

</style>
