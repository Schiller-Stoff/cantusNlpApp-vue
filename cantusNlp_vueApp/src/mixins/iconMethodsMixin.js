

export const iconMethodsMixin = {
  data(){
    return {
      curActive: {activeElem:undefined,defaultCss:undefined}
    }
  },
  methods: {
    markActive(evt, borderPos='none'){
      let targetElem = evt.target;
      let curCss = evt.target.style;
      if(targetElem!==this.curActive.activeElem){
        targetElem.style.transform = "rotate(180deg)";
        targetElem.style.color = "orange"
        //assign the right border according to given param
        switch (borderPos.toLowerCase()){
          case "left":
            targetElem.style.borderLeft = ".15em solid orange";
            break;
          case "right":
            targetElem.style.borderRight = ".15em solid orange";
            break;
          case "top":
            targetElem.style.borderTop = ".15em solid orange";
            break;
          case "bottom":
            targetElem.style.borderBottom = ".15em solid orange";
            break;
          default:
            break;
        }

        //reset style (as soon as an element was assigned)
        if(this.curActive.activeElem!==undefined){
          this.curActive.activeElem.style = this.curActive.defaultCss;
        }
        this.curActive = {activeElem: targetElem, defaultCss:curCss};
      }
    }
  }
}
