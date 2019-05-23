<template>
  <div class="input-group">
    <span
      class="input-group-addon"
      id="basic-addon1"
      @click="searchToggable ? toggleSearchField() : ''"

    >{{showSearch ? searchButton.textActive : searchButton.textInActive}}</span>

    <select
      v-model="value"
      class="form-control VToggableSearchBar_select"
      id="inputGroupSelect03"
      @change="vModelEmit(value)"
      v-if="searchToggable ? showSearch : true">

      <option
        v-for="option in options"
        :value="option"
      >{{option.text}}
      </option>

    </select>
  </div>
</template>

<script>
  export default {
    name: "VToggableSearchBar",
    props: {
      searchButton:{
        type:Object,
        required:true,
        validator(value){
          let demandedKeys = ['textActive','textInActive']
          for (let key of demandedKeys){
            try {
              if(value[key]===undefined)throw new Error();
            } catch (e) {
              console.error('Key not found in searchButton prop for VToggableSearchBar.vue. Missing key: ' + key);
              return false;
            }
          }
          return true;
        }
      },
      options: {
        type: Array,
        required: true,
        validator(value){
          let demandedKeys = ['text','value']
          for (let key of demandedKeys){
            try {
              if(value[0][key]===undefined)throw new Error();
            } catch (e) {
              console.error('Key not found in options prop for VToggableSearchBar.vue. Missing key: ' + key);
              return false;
            }
          }
          return true;
        }
      },
      searchToggable: {
        required: true,
        default: false
      }
    },
    data(){
      return {
        showSearch: !this.searchToggable,
        value:''
      }
    },
    methods:{
      toggleSearchField(){
        this.showSearch = !this.showSearch
        this.$emit('searchFieldToggled',this.showSearch)
      },
      vModelEmit(val){
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped lang="scss">


</style>
