<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" ref="first"></div>
      <div class="col-md-11" id="second" ref="second"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MainGrid",
      data(){
        return {

        }
      },
      methods: {
        moveWidth(){

          this.$refs.first.classList.add('transition')
          this.$refs.second.classList.add('transition')

          this.$refs.first.classList.remove('col-md-1')
          this.$refs.second.classList.remove('col-md-11')

          this.$refs.first.classList.add('col-md-7')
          this.$refs.second.classList.add('col-md-4')
        },
        restoreWidth(){
          this.$refs.first.classList.add('transition')
          this.$refs.second.classList.add('transition')

          this.$refs.first.classList.remove('col-md-7')
          this.$refs.second.classList.remove('col-md-4')

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
  background-color: $tertiaryColor;

}

#second {
  background-color: $primaryColor;
}

.transition {
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
}


</style>
