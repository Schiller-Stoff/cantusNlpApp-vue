<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" ref="first"></div>
      <div class="col-md-10" id="second" ref="second"></div>
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

          this.$refs.first.classList.remove('col-md-2')
          this.$refs.second.classList.remove('col-md-10')

          this.$refs.first.classList.add('col-md-8')
          this.$refs.second.classList.add('col-md-3')
        },
        restoreWidth(){
          this.$refs.first.classList.remove('col-md-8')
          this.$refs.second.classList.remove('col-md-3')

          this.$refs.first.classList.add('col-md-2')
          this.$refs.second.classList.add('col-md-10')

          setTimeout(_=>{
            this.$refs.first.classList.remove('transition')
            this.$refs.second.classList.remove('transition')
          },500)

        }
      }
    }
</script>

<style scoped>

.col-md-1 {
  background-color: lightblue;
  height: 50vh;
}

.col-md-11 {
  background-color: lightgreen;
}

.row {
  height: 100vh;
}

#first {
  background-color: lightgreen;
  /*transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);*/
}

#second {
  background-color: lightblue;
  /*transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);*/
}

.transition {
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
}


</style>
