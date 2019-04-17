

const state = {
  curSearchQuery:'',
  searchParams:{
    chosenGenre:'',
    chosenLO:'',
    chosenTimeFrame:''
  },
  searchResult:undefined,
  ongoingSearch: false,
  searchFailed:false
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
  },
  'search_markOngoingSearch'(state, payload = !state.ongoingSearch){
    if((payload!== true) && (payload !==false)) console.error(`InvalidState: ongoingSearch must be a Boolean but got: ${payload}`)
    state.ongoingSearch = payload
  },
  'search_toggleSearchFailed'(state,payload = !state.searchFailed){
    state.searchFailed = payload
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
  },
  'search_markOngoingSearchAction'({commit},payload){
    commit('search_markOngoingSearch',payload)
  },
  'search_setSearchFailedAction'({commit},payload){
    commit('search_toggleSearchFailed',payload)
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
  },
  'search_getOngoingSearch'(state){
    return state.ongoingSearch
  },
  'search_getSearchFailed'(state){
    return state.searchFailed
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
