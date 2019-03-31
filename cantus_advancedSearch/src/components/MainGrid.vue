<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" ref="first">
        <app-search-bar></app-search-bar>
      </div>
      <div class="col-md-11" id="second" ref="second">
        <app-result></app-result>
      </div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from "../main";
  import SearchBar from './search/SearchBar'
  import Result from './result/Result'
    export default {
      name: "MainGrid",
      components: {
        appSearchBar: SearchBar,
        appResult: Result
      },
      data(){
        return {

        }
      },
      methods: {
        moveWidth(){
          EventBus.$emit('searchBarEnlarge');

          this.$refs.first.classList.add('transition')
          this.$refs.second.classList.add('transition')

          this.$refs.first.classList.remove('col-md-1')
          this.$refs.second.classList.remove('col-md-11')

          this.$refs.first.classList.add('col-md-7')
          this.$refs.second.classList.add('col-md-5')
        },
        restoreWidth(){
          EventBus.$emit('searchBarMinified')

          this.$refs.first.classList.add('transition')
          this.$refs.second.classList.add('transition')

          this.$refs.first.classList.remove('col-md-7')
          this.$refs.second.classList.remove('col-md-5')

          this.$refs.first.classList.add('col-md-1')
          this.$refs.second.classList.add('col-md-11')

          setTimeout(_=>{
            this.$refs.first.classList.remove('transition')
            this.$refs.second.classList.remove('transition')
          },500)

        }
      }
    }
</script>

<style scoped lang="scss">
@import '../scss/globalVariables/globalVariables.scss';
.row {
  height: 100vh;
}

#first {
  background-color: $secondaryColor;

}

#second {
  background-color: $blankColor;
}

.transition {
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
}


</style>
