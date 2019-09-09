<template>
  <div class="VCompareList_mainCointainer">
    <ul class="VCompareList_mainUl list-group list-inline">
      <li class="VCompareList_outerLi list-group-item" v-for="(item,i) in arrayToLoop">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(result,index) in item"
            :class="assignLiClass(result.type) + ' ' + result.class"

          >
            <a :href="result.type==='header' ? '' : result.href" :style="result.type==='header' ? 'text-decoration:none;color:white' : ''">
              {{ index!==0 ? (result.val) :
              `${result.val}` }}
            </a>
            <span @click="deHighlight(); highlightLis($event)" v-if="index > 3" data-balloon="Mark incipit position" aria-label="Incipit position" data-balloon-pos="up"><i class="fas fa-thumbtack" ></i></span>
            <span v-if="result.type==='header'" class="badge">{{item.length-4}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  //TODO implement validator function to secure functionality -- see default function
  //TODO do we need tooltips?
  //TODO remove old implementations like setting href etc. in the template above

  export default {
    name: "VCompareList",
    props: {
      arrayToLoop: {
        type: Array,
        required: true,
        default(){
          return [
            [
              {val:'Perch',href:'https://google.com',type:"header"},
              {val:'Swordfish',href:'https://google.com',type:"subHeader"},
              {val:'Coad',href:'https://google.com',type:"normal"},
              {val:'Crab',href:'https://google.com'},
              {val:'Perch',href:'https://google.com'},
            ],
            [,
              {val:'Perch',href:'https://google.com',type:"header"},
              {val:'Swordfish',href:'https://google.com',type:"subHeader"},
              {val:'Coad',href:'https://google.com',type:"normal"},
              {val:'Perch',href:'https://google.com'},
              {val:'Perch',href:'https://google.com'},

            ],
            [
              {val:'Perch',href:'https://google.com',type:"header"},
              {val:'Swordfish',href:'https://google.com',type:"subHeader"},
              {val:'Coad',href:'https://google.com',type:"normal"},
              {val:'Coconut',href:'https://google.com'},
              {val:'Perch',href:'https://google.com'},
            ],
            [
              {val:'Perch',href:'https://google.com',type:"header"},
              {val:'Swordfish',href:'https://google.com',type:"subHeader"},
              {val:'Coad',href:'https://google.com',type:"normal"},
              {val:'Perch',href:'https://google.com'},
              {val:'Perch',href:'https://google.com'},
            ]
          ]
        },
        validator(val){

          return true
        }
      }
    },
    data(){
      return {
        lastLis:[]
      }
    },
    methods:{
      assignLiClass(val){
        switch (val) {
          case 'header':
            return 'active'
          case 'subHeader':
            return 'list-group-item-info'
          case 'normal':
            return ''
          default:
            return ''
        }
      },
      highlightLis(evt){
        let elem = evt.target
        if(elem.tagName === 'SPAN') elem = elem.children[0];
        let className = elem.parentElement.parentElement.classList[elem.classList.length-1].toString()
        let all = document.querySelectorAll('.' + className)

        //saving reference for toggle (for the deHighlight method)
        this.lastLis = all;

        for (let i = 0; i < all.length; i++) {
          let cur = all[i]
          cur.classList.add('highlighted')
        }
      },
      deHighlight(){
        let all = this.lastLis;
        for (let i = 0; i < all.length; i++) {
          let cur = all[i]
          cur.classList.remove('highlighted')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables";

  .highlighted {
    background-color: $primaryColor;
  }

  .VCompareList_outerLi {
    vertical-align: top;
  }

  .VCompareList_mainUl {
    width: 1000em;
    border: none;
    .active {
      background-color: $secondaryColor;
      border-color: $secondaryColor;
    }
    .list-group-item-info {
      background-color: $primaryColor;
      border-color: $secondaryColor;
    }
    a {
      color: $secondaryColor;
    }
    i {
      cursor: pointer;
    }
    & > li {
      border: none;
      padding:0;

      li {
        transition: background-color .25s ;
        border-top-left-radius:0;
        border-top-right-radius: 0;
      }

}
}

.VCompareList_mainCointainer {
overflow-x: auto;
}

</style>
