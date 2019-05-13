

const state = {
  incipitQuery:'',
  vizCompareQuery:'',
  searchParams:{
    chosenGenre:'',
    chosenLO:'',
    chosenTimeFrame:''
  },
  searchResult:undefined,
  ongoingSearch: false,
  searchFailed:false,
  searchHistory:[]
}

const mutations = {
  'search_modifyCurSearchQuery'(state,payload){
    state.incipitQuery = payload
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
  },
  'search_pushOntoSearchHistory'(state,payload){
    let requiredKeys = ['response','searchParams']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidState: given object to be pushed onto vuex's searchHistory array has not the property ${key} but is required. Given object was: ${payload}`)
    }
    state.searchHistory.push(payload)
  },
  'search_setVizCompareQuery'(state,payload){
    state.vizCompareQuery = payload
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
  },
  'search_pushOntoSearchHistoryAction'({commit},payload){
    commit('search_pushOntoSearchHistory',payload)
  },
  'search_setVizCompareQueryAction'({commit},payload){
    commit('search_setVizCompareQuery',payload)
  }
}

const getters = {
  'search_getCurSearchQuery'(state){
    return state.incipitQuery
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
  },
  'search_getSearchHistory'(state){
    return state.searchHistory
  },
  'search_getVizCompareQuery'(state){
    return state.vizCompareQuery
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
