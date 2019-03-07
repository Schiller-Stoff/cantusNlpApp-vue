<template>
  <div id="cardView_container">
    <div>
      <div @click="notify('Intro Ansichtsleiste')" class="cantusNlp_iconHolder" data-balloon="Intro Ansichtsleiste" data-balloon-pos="up"><i class="fas fa-info-circle fa-2x"></i></div>
    </div>
    <hr>
    <div>
      <div @click="notify('Ansichten vergrößert');resizeAllCards('100%', '75em')" class="cantusNlp_iconHolder" data-balloon="Ansichten vergrößern" data-balloon-pos="up"><i class="fas fa-th-large fa-2x"></i></div>
    </div>
    <div>
      <div @click="notify('Ansichten verkleinert'); resizeAllCards('400px', '600px')" class="cantusNlp_iconHolder" data-balloon="Ansichten verkleinern" data-balloon-pos="up"><i class="fas fa-th fa-2x"></i></div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from "../main";
  export default {
    name: "CardView",
    methods:{
      notify(title,msg){
        this.$notify({
          group: 'foo',
          title: title,
          text: msg
        });
      },
      resizeAllCards(minWidth, minHeight){
        let cssSizeObj= {
          "min-width": minWidth,
          "min-height": minHeight
        }
        EventBus.$emit('resizeCards',cssSizeObj);
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../scss/globalVariables";

  #cardView_container {
    margin-top: 35vh;
    hr {
      color: $blankColor;
      border: .05em $blankColor solid;
      border-radius: 10em;
      width: 3em;
    }
  }

</style>
