<template>
  <div id="cardView_container">
    <div>
      <div @click="notify('Intro Ansichtsleiste')" class="cantusNlp_iconHolder" data-balloon="Intro Ansichtsleiste" data-balloon-pos="up"><i class="fas fa-info-circle"></i></div>
    </div>
    <hr>
    <div>
      <div @click="notify('Ansichten vergrößert');resizeAllCards('100%', '75em');markActive($event,'right')" class="cantusNlp_iconHolder" data-balloon="Ansichten vergrößern" data-balloon-pos="up"><i class="fas fa-th-large"></i></div>
    </div>
    <div>
      <div @click="notify('Ansichten verkleinert'); resizeAllCards('400px', '600px');markActive($event,'right')" class="cantusNlp_iconHolder" data-balloon="Ansichten verkleinern" data-balloon-pos="up"><i class="fas fa-th"></i></div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from "../main";
  import {vueNotifyMixin} from "../mixins/vueNotifyMixin";
  import {iconMethodsMixin} from "../mixins/iconMethodsMixin";
  export default {
    name: "CardView",
    mixins: [vueNotifyMixin, iconMethodsMixin],
    methods:{
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
