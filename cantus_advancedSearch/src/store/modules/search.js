

const state = {
  curSearchQuery:'',
  searchParams:{
    chosenGenre:'',
    chosenLO:'',
    chosenTimeFrame:''
  },
  searchResult:''
}

const mutations = {
  'search_modifyCurSearchQuery'(state,payload){
    state.curSearchQuery = payload
  },
  'search_setSearchParams'(state,payload){
    let requiredKeys = ['chosenGenre','chosenLO','chosenTimeFrame']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidSearchInput: Could not find required key ${key} in given searchParams object. ${payload}`);
    }
    state.searchParams = payload
  },
  'search_setSearchResult'(state,payload){
    state.searchResult = payload
  }
}

const actions = {
  'search_modifyCurSearchQueryAction'({commit},payload){
    commit('search_modifyCurSearchQuery',payload)
  },
  'search_setSearchParamsAction'({commit},payload){
    commit('search_setSearchParams',payload)
  },
  'search_setSearchResultAction'({commit},payload){
    commit('search_setSearchResult',payload)
  }
}

const getters = {
  'search_getCurSearchQuery'(state){
    return state.curSearchQuery
  },
  'search_getSearchParams'(state){
    return state.searchParams
  },
  'search_getSearchResult'(state){
    return state.searchResult
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
