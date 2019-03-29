<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" :style="width1" ref="first"></div>
      <div class="col-md-10" id="second" :style="width2" ref="second"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MainGrid",
      data(){
        return {
          width1:'width:15%',
          width2:'width:85%'
        }
      },
      methods: {
        moveWidth(){
          this.$refs.first.classList = []
          this.$refs.second.classList = []

          let firstWidth = parseInt(this.$refs.first.style.width.replace('%',''));
          let secondWidth = 100 - firstWidth;
          let changeVal = 5;

          let interval = setInterval(_=>{
            if(secondWidth===50) return clearInterval(interval);
            firstWidth += changeVal;
            secondWidth -= changeVal;

            this.width1 = 'width:' + firstWidth + '%'
            this.width2 = 'width:' + secondWidth + '%'
          },20);
        },
        restoreWidth(){


          let firstWidth = parseInt(this.$refs.first.style.width.replace('%',''));
          let secondWidth = 100 - firstWidth;
          let changeVal = -5;

          let interval = setInterval(_=>{
            if(secondWidth===85){
              this.$refs.first.classList = ['col-md-2']
              this.$refs.second.classList = ['col-md-10']
              return clearInterval(interval);
            }
            firstWidth += changeVal;
            secondWidth -= changeVal;

            this.width1 = 'width:' + firstWidth + '%'
            this.width2 = 'width:' + secondWidth + '%'
          },20);
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
  width: 10%;
  height: 100%;
  display: inline-block;
}

#second {
  background-color: lightblue;
  width: 90%;
  height: 100%;
  float:right;
}

</style>
