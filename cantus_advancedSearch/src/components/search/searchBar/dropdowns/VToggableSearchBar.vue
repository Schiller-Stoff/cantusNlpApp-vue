<template>

  <div>

    <div class="input-group" v-if="toggleOptions.inputType ==='text'">
      <span class="input-group-addon" id="basic-addon2"><i v-if="showInputMarker" :class="inputFilledMarker"></i>{{ searchButton.textInActive }}</span>
      <input v-model="fullTextInput" type="text" class="form-control" placeholder="Text" aria-describedby="basic-addon2">
    </div>



    <span
      v-if="toggleOptions.mode==='top' && toggleOptions.inputType!=='text'"
      class="VToggableSearchBar_topSpan"
      @click="toggleSearchField()"
      :data-balloon="showTopLinkedSearch ? 'Einschränkung deaktivieren' : 'Einschränkung aktivieren'"
      data-balloon-pos="left"
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
        <i v-if="showInputMarker" :class="inputFilledMarker"></i>
        {{(showSearch ||showTopLinkedSearch) ? searchButton.textActive : searchButton.textInActive}}</span>

      <select
        v-model="selectedValue"
        class="form-control VToggableSearchBar_select"
        id="inputGroupSelect03"
        v-if="(!slotPassed) && (searchToggable ? (showSearch||showTopLinkedSearch) : true)">

        <option
          v-for="option in options"
          :value="option"
        >{{option.text}}
        </option>
      </select>

      <slot
        name="optional"
        :options="options"
        class="form-control VToggableSearchBar_select"
        v-model="selectedValue"
      ></slot>
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
        validator(value){
          let demandedKeys = ['mode']
          for (let key of demandedKeys){
            try {
              if(value[key]===undefined)throw new Error();
            } catch (e) {
              console.error('Key not found in options prop for VToggableSearchBar.vue. Missing key: ' + key);
              return false;
            }
          }
          return true;
        }
      },
      value:{text:'',value:''},
      showInputMarker: {
        type:Boolean,
        default:true
      },

      storageKey:{
        type: String
      }

    },
    data(){
      return {
        showSearch: this.toggleOptions.mode==='normal' ? !this.searchToggable : false,
        showTopLinkedSearch: this.toggleOptions.mode==='top' ? !this.searchToggable : false,
        fullTextInput: ''
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
      }
    },
    computed: {
      faClass(){
        return this.showTopLinkedSearch ? 'far fa-check-circle green' : 'far fa-times-circle red'
      },
      inputFilledMarker(){
        return ((this.value === '')||(!this.value)|| this.value.value ==='') ? 'fas fa-hourglass-start red' : 'fas fa-check green'
      },
      slotPassed(){
        try {
         return (this.$slots.optional.length > 0)
        } catch (e) {
          return false
        }
      },
      selectedValue: {
        get() {
          return this.value;
        },
        set(v) {
          if(this.storageKey)localStorage.setItem(this.storageKey.toString(), JSON.stringify(v))
          this.$emit('input', v)
        }
      }
    },
    watch: {
      fullTextInput(){
        this.selectedValue = {text:this.fullTextInput, value:this.fullTextInput}
      }
    },
    created(){
      if(this.storageKey){
        this.selectedValue = JSON.parse(localStorage.getItem(this.storageKey.toString()))
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
