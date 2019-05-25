

const state = {
  fullTextSearchParams:{
    chosenText:'',
    chosenFeasts:'',
    chosenHora:'',
  },
  incipitSearchResult:undefined,
}

const mutations = {
  'fullText_setSearchParams'(state,payload){
    let requiredKeys = ['chosenText','chosenFeasts','chosenHora']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidSearchInput: Could not find required key ${key} in given searchParams object. ${payload}`);
    }
    state.fullTextSearchParams = payload
  },
  'fullText_setSearchResult'(state,payload){
    state.fullTextSearchResult = payload
  },
}

const actions = {
  'incipit_setSearchParamsAction'({commit},payload){
    commit('fullText_setSearchParams',payload)
  },
  'fullText_setSearchResultAction'({commit},payload){
  commit('fullText_setSearchResult',payload)
}
}

const getters = {
  'fullText_getSearchParams'(state){
    return state.fullTextSearchParams
  },
  'fullText_getSearchResult'(state){
    return state.fullTextSearchResult
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
