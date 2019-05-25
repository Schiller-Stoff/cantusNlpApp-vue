<template>
  <div class="VCompareList_mainCointainer">
    <ul class="VCompareList_mainUl list-group list-inline">
      <li class="VCompareList_outerLi list-group-item" v-for="(item,i) in arrayToLoop">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(result,index) in item"
            :class="assignLiClass(result.type)"
          >
            <a :href="result.type==='header' ? '' : result.href" :style="result.type==='header' ? 'text-decoration:none;color:white' : ''">
              {{ index!==0 ? (result.val) :
              `${result.val}` }}
            </a>
            <span v-if="result.type==='header'" class="badge">{{item.length}}</span>
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

      }
    }
  }
</script>

<style scoped lang="scss">

  .VCompareList_outerLi {
    vertical-align: top;
  }

  .VCompareList_mainUl {
    width: 1000em;
    border: none;
    & > li {
      border: none;
      padding:0;

      li {
        border-top-left-radius:0;
        border-top-right-radius: 0;
      }

}
}

.VCompareList_mainCointainer {
overflow-x: auto;
}

</style>
