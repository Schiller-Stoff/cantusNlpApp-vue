<template>
    <div class="container">
      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="LO_select" class="sr-only">LO Selection</label>
          <select id="LO_select" class="form-control form-control" v-model="selectedLO">
            <option v-for="corpus in corpora">{{ corpus.name }}</option>
          </select>
        </div>
        <!--<div class="form-group mb-2">-->
          <!--<label for="LO_view_select" class="sr-only">Email</label>-->
          <!--<select id="LO_view_select" class="form-control form-control">-->
            <!--<option>Was wäre hier sinnvoll`?</option>-->
          <!--</select>-->
        <!--</div>-->
        <button type="button" class="btn btn-primary mb-2" @click.prevent="createCard(selectedLO)">LO hinzufügen</button>
        <div id="cardBuilder_tourButton">
          <div data-balloon="Erkläre Werkzeuge" data-balloon-pos="right"><i class="fas fa-info-circle fa-2x"></i></div>
        </div>
      </form>

    </div>
</template>

<script>
  import {EventBus} from "../main";
  export default {
    name: "CardBuilderSettings",
    props: ["corpora"],
    data(){
      return {
        selectedLO:"LO auswählen"
      }
    },
    methods: {
      createCard(LO){
        for (let corpus of this.corpora) {
          if(corpus.name===LO){
            console.log("adding now " + LO)
            return EventBus.$emit('cardCreate',corpus);
          }
        }
      }
    }

  }
</script>

<style scoped>

  #cardBuilder_tourButton {
    color: lightgrey;
    margin-left: 2em;
  }

  .container {
    margin-top: 1%;
    margin-left:7.5%;
  }

  .form-group {
    margin-right: 1.5em;
  }

</style>
