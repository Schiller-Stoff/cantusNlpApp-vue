<template>
  <app-v-toggable-search-bar
    :searchButton="{testActive:'Volltext',textInActive:'Volltext'}"
    :options="[]"
    :toggleOptions="{mode:'normal',inputType:'text'}"
    v-model="value"
    @input="vModelEmit($event)"
  ></app-v-toggable-search-bar>
</template>

<script>
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VFullTextInput",
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
    }
  }
</script>

<style scoped>

</style>
