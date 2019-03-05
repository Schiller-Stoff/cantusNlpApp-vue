<template>
  <div>
    <div>
      <i class="fas fa-atlas fa-2x" @click="createLOCard"></i>
    </div>
    <hr>
    <div>
      <i class="fas fa-adjust fa-2x"></i>
      <i class="fab fa-creative-commons-share fa-2x"></i>
    </div>
    <hr>
    <div>
      <i class="fab fa-adn fa-2x"></i>
      <i class="fas fa-broom fa-2x" @click="deleteAllCards"></i>
    </div>
  </div>
</template>

<script>
    import {EventBus} from "./../main";
    export default {
      name: "CardBuilder",
      methods: {
        createLOCard(){
          EventBus.$emit('cardCreate');
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
