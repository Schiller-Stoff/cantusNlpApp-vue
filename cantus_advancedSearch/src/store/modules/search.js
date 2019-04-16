

const state = {
  curSearchQuery:'',
  searchParams:{    //todo implement!
    chosenGenre:'',
    chosenLO:'',
    chosenTimeFrame:''
  }
}

const mutations = {
  'search_modifyCurSearchQuery'(state,payload){
    state.curSearchQuery = payload
  },

  'search_setSearchParams'(state,payload){
    let requiredKeys = ['chosenGenre','chosenLO','chosenTimeFrame']
    for (let keys in requiredKeys){
      if(!payload.hasOwnProperty(keys))console.error(`InvalidSearchInput: Could not find required key ${key} in given searchParams object. ${payload}`);
    }
    state.searchParams = payload
  }
}

const actions = {
  'search_modifyCurSearchQueryAction'({commit},payload){
    commit('search_modifyCurSearchQuery',payload)
  },
  'search_setSearchParamsAction'({commit},payload){
    commit('search_setSearchParams',payload)
  }
}

const getters = {
  'search_getCurSearchQuery'(state){
    return state.curSearchQuery
  },
  'search_getSearchParams'(state){
    return state.searchParams
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
