<template>

  <div>
    <h2>Cantus Erweiterte Suche</h2>
    <hr>
    <div class="ResultDefault_iconHolder">
      <i class="fas fa-arrow-circle-left"></i>
      <p>Bewegen Sie die Maus über die blaue Leiste Links um eine Suche zu starten.</p>
    </div>

    <div v-if="showFullContent">
      <div class="ResultDefault_iconHolder">
        <i class="fas fa-arrow-circle-left"></i>
        <p>Bewegen Sie die Maus über die blaue Leiste Links um eine Suche zu starten.</p>
      </div>
      <div class="ResultDefault_iconHolder">
        <i class="fas fa-arrow-circle-left"></i>
        <p>Bewegen Sie die Maus über die blaue Leiste Links um eine Suche zu starten.</p>
      </div>
    </div>
  </div>
</template>

<script>
  let timer;
  import {EventBus} from "../../main";
  export default {
    name: "ResultDefault",
    components: {

    },
    data(){
      return {
        showFullContent:false
      }
    },
    created(){
      EventBus.$on('searchBarMinified',_=>{
        if(!this.showFullContent)return clearTimeout(timer);
        this.showFullContent = false;
      });

      EventBus.$on('searchBarEnlarge',_=>{
        if(this.showFullContent)return;
        timer = setTimeout(_=>{
          this.showFullContent = true;
        },500)
      });
    }
  }
</script>

<style scoped lang="scss">

  .ResultDefault_iconHolder {
    i {
      color: #0047bb;
      font-size: 3em;
      margin: .75em .75em .5em 0;
    }
    i,p {display: inline-block;}
  }

</style>
