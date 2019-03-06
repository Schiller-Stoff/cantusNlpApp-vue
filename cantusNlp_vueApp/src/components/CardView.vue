<template>
  <div id="cardView_container">
    <div>
      <div @click="notify('Intro Ansichtsleiste')" data-balloon="Intro Ansichtsleiste" data-balloon-pos="up"><i class="fas fa-info-circle fa-2x"></i></div>
    </div>
    <hr>
    <div>
      <div @click="notify('Ansichten vergrößert');resizeAllCards('100%', '75em')" data-balloon="Ansichten vergrößern" data-balloon-pos="up"><i class="fas fa-th-large fa-2x"></i></div>
    </div>
    <div>
      <div @click="notify('Ansichten verkleinert'); resizeAllCards('400px', '600px')" data-balloon="Ansichten verkleinern" data-balloon-pos="up"><i class="fas fa-th fa-2x"></i></div>
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

  #cardView_container {
    margin-top: 35vh;
    i {
      display: block;
      margin-top: .5em;
      margin-left: auto;
      color:white;
    }
    hr {
      color: white;
      border: .05em white solid;
      border-radius: 10em;
      width: 3em;
    }
  }

  div {
    margin-top: 2em;
  }





</style>
