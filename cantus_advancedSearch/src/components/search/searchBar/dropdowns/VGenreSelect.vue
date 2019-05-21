<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text" for="inputGroupSelect02">Genre</label>
    </div>
    <select v-model="value" class="custom-select" id="inputGroupSelect02" @change="emitVal(value)">
      <option v-for="genre in genres" :value="genre.value">{{genre.text}}</option>
    </select>
  </div>
</template>

<script>

  import {genres} from "../../../../data/genres";

  export default {
    name: "VGenreSelect",
    data(){
      return {
        value:'',
        genres
      }
    },
    methods: {
      emitVal(val){
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped>

</style>
