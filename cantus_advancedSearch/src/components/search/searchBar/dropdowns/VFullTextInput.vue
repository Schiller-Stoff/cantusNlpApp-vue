<template>
  <app-v-toggable-search-bar
    :searchButton="{textActive:'Volltext',textInActive:'Volltext'}"
    :options="[{text:'',value:''}]"
    :toggleOptions="{mode:'normal',inputType:'text'}"
    v-model="selectedValue"
  ></app-v-toggable-search-bar>
</template>

<script>
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VFullTextInput",
    props:{
      value: {
        default(){
          return {text:'',value:''}
        }
      }
    },
    components: {
      appVToggableSearchBar:VToggableSearchBar
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      vModelEmit(val) {
        this.$emit('input', val)
      }
    },
    computed: {
      selectedValue: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v)
        }
      }
    }
  }
</script>

<style scoped>

</style>
