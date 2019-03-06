<template>
  <div>
    <div>
      <div data-balloon="Wortwolke" data-balloon-pos="up" @click="changeAllCardsView('Cirrus')"><i class="fas fa-cloud-meatball fa-2x"></i></div>
      <!--<i class="fas fa-atlas fa-2x" @click="createLOCard"></i>-->
    </div>
    <hr>
    <div>
      <div data-balloon="Korpusansicht" data-balloon-pos="up" @click="changeAllCardsView('Reader')"><i class="fas fa-adjust fa-2x"></i></div>
    </div>
    <div>
      <div>
        <div data-balloon="Übersicht" data-balloon-pos="up" @click="changeAllCardsView('Summary')"><i class="fab fa-creative-commons-share fa-2x"></i></div>
      </div>
    </div>
    <hr>
    <div>
      <div>
        <div data-balloon="Übersicht" data-balloon-pos="up"><i class="fab fa-adn fa-2x"></i></div>
      </div>
      <div>
        <div data-balloon="Karten entfernen" data-balloon-pos="up"><i class="fas fa-broom fa-2x" @click="deleteAllCards"></i></div>
      </div>

    </div>
  </div>
</template>

<script>
    import {EventBus} from "./../main";
    export default {
      name: "CardBuilder",
      methods: {
        changeAllCardsView(view_str){
          EventBus.$emit('allViewChange',view_str);
        },
        deleteAllCards(){
          EventBus.$emit("deleteAll");
        }
      }
    }
</script>

<style scoped>

  div {
    margin-top: 2em;
  }

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

  .fa-atlas:before{
    cursor: pointer;
  }

  .fa-broom:hover {
    cursor: pointer;
  }

</style>
