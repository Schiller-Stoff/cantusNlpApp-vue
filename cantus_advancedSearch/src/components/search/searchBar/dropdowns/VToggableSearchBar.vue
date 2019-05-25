<template>

  <div>

    <div class="input-group" v-if="toggleOptions.inputType ==='text'">
      <span class="input-group-addon" id="basic-addon2"><i :class="inputFilledMarker"></i>{{ searchButton.textInActive }}</span>
      <input v-model="value" type="text" class="form-control" placeholder="Text" aria-describedby="basic-addon2" @change="vModelEmit(value)">
    </div>



    <span
      v-if="toggleOptions.mode==='top' && toggleOptions.inputType!=='text'"
      class="VToggableSearchBar_topSpan"
      @click="toggleSearchField()"
    >

      <i :class="faClass"></i>
      {{ showTopLinkedSearch ? searchButton.textActive : searchButton.textInActive }}
    </span>

    <div class="input-group" v-if="((searchToggable ? (showSearch||showTopLinkedSearch) : true) && toggleOptions.inputType!=='text' )">
      <span
        class="input-group-addon"
        id="basic-addon1"
        @click="searchToggable ? toggleSearchField() : ''"
        v-if="toggleOptions.mode==='normal'"

      >
        <i :class="inputFilledMarker"></i>
        {{(showSearch ||showTopLinkedSearch) ? searchButton.textActive : searchButton.textInActive}}</span>

      <select
        v-model="value"
        class="form-control VToggableSearchBar_select"
        id="inputGroupSelect03"
        @change="vModelEmit(value)"
        v-if="(searchToggable ? (showSearch||showTopLinkedSearch) : true)">

        <option
          v-for="option in options"
          :value="option"
        >{{option.text}}
        </option>
      </select>
    </div>

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
        default: false
      },
      toggleOptions: {
        default(){
          return {
            mode:'normal'
          }
        },
        validator(){
          let demandedKeys = ['mode','inputType']
        }
      }
    },
    data(){
      return {
        showSearch: this.toggleOptions.mode==='normal' ? !this.searchToggable : false,
        showTopLinkedSearch: this.toggleOptions.mode==='top' ? !this.searchToggable : false,
        value:''
      }
    },
    methods:{
      toggleSearchField(){
        if(this.toggleOptions.mode==='top'){
          this.showTopLinkedSearch = !this.showTopLinkedSearch
          return this.$emit('searchFieldToggled',this.showTopLinkedSearch)
        }

        this.showSearch = !this.showSearch
        this.$emit('searchFieldToggled',this.showSearch)
      },
      vModelEmit(val){
        this.$emit('input',val)
      }
    },
    computed: {
      faClass(){
        return this.showTopLinkedSearch ? 'far fa-check-circle green' : 'far fa-times-circle red'
      },
      inputFilledMarker(){
        return this.value === '' ? 'fas fa-hourglass-start red' : 'fas fa-check green'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../scss/globalVariables/globalVariables";

  .VToggableSearchBar_topSpan {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    background-color:#eee;
    padding: 3px 8px;
    border: 1px solid #ccc;
    transition: background-color .25s;
    &:hover {
      cursor: pointer;
      background-color: $fourthColor;
    }

    i {
      margin: .25em .5em 0 0
    }

  }

  .input-group {
    i {
      /*color:$secondaryColor;*/
      margin-right: .25em;
    }
  }

  .green {
    color: lightgreen;
  }

  .red {
    color: tomato;
  }


</style>
