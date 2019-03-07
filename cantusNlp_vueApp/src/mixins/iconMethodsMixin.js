

export const iconMethodsMixin = {
  data(){
    return {
      curActive: {activeElem:undefined,defaultCss:undefined}
    }
  },
  methods: {
    markActive(evt){
      let targetElem = evt.target;
      let curCss = evt.target.style;
      if(targetElem!==this.curActive.activeElem){
        targetElem.style.transform = "rotate(180deg)";
        targetElem.style.color = "orange"
        targetElem.style.borderRight = ".15em solid orange";
        if(this.curActive.activeElem!==undefined){
          this.curActive.activeElem.style = this.curActive.defaultCss;
        }
        this.curActive = {activeElem: targetElem, defaultCss:curCss};
      }
    }
  }
}
