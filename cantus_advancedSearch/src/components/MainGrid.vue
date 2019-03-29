<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1 btn btn-primary">
        Erweiterte Suche
      </div>
      <div class="col-md-11">
        <div @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" :style="width1" ref="first"></div>
        <div id="second" :style="width2" ref="second"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MainGrid",
      data(){
        return {
          width1:'width:5%',
          width2:'width:95%'
        }
      },
      methods: {
        moveWidth(){
          let firstWidth = parseInt(this.$refs.first.style.width.replace('%',''));
          let secondWidth = 100 - firstWidth;
          let changeVal = 5;

          let interval = setInterval(_=>{
            if(secondWidth===50) return clearInterval(interval);
            firstWidth += changeVal;
            secondWidth -= changeVal;

            this.width1 = 'width:' + firstWidth + '%'
            this.width2 = 'width:' + secondWidth + '%'
          },10);
        },
        restoreWidth(){
          let firstWidth = parseInt(this.$refs.first.style.width.replace('%',''));
          let secondWidth = 100 - firstWidth;
          let changeVal = -5;

          let interval = setInterval(_=>{
            if(secondWidth===95) return clearInterval(interval);
            firstWidth += changeVal;
            secondWidth -= changeVal;

            this.width1 = 'width:' + firstWidth + '%'
            this.width2 = 'width:' + secondWidth + '%'
          },10);
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

#first {
  background-color: red;
  width: 10%;
  height: 100%;
  display: inline-block;
}

#second {
  background-color: #CC5314;
  width: 90%;
  height: 100%;
  float:right;
}

</style>
