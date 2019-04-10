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
        appResult: Result,
      },
      data(){
        return {
          interfaceLocked:false,
          searchBarEnlarged: false
        }
      },
      methods: {
        moveWidth(){
          if(this.searchBarEnlarged||this.interfaceLocked)return;

          this.searchBarEnlarged = true
          EventBus.$emit('searchBarEnlarge');

          this.$refs.first.classList.add('transition')
          this.$refs.second.classList.add('transition')

          this.$refs.first.classList.remove('col-md-1')
          this.$refs.second.classList.remove('col-md-11')

          this.$refs.first.classList.add('col-md-7')
          this.$refs.second.classList.add('col-md-5')
        },
        restoreWidth(){
          if(!this.searchBarEnlarged || this.interfaceLocked)return
          EventBus.$emit('searchBarMinified')
          this.searchBarEnlarged = false

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
      },
      created(){
        EventBus.$on('interfaceLocked',_=>{
          this.interfaceLocked = true
        })

        EventBus.$on('interfaceOpened',_=>{
          this.interfaceLocked = false
        })
      }
    }
</script>

<style scoped lang="scss">
@import '../scss/globalVariables/globalVariables.scss';

#first {
  background-color: $tertiaryColor;
  min-height: 100vh;

}

#second {
  background-color: $blankColor;
  min-height: 100vh;
}

.transition {
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
}


</style>
