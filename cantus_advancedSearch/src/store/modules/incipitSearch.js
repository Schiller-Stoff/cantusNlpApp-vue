

const state = {
  //vizCompareQuery:'',
  incipitSearchParams:{
    chosenLO:'',
    chosenFeasts:'',
    chosenHora:'',
    chosenGenre:''

  },
  incipitSearchResult:undefined,
  ongoingSearch: false,
  searchFailed:false,
  searchHistory:[]
}

const mutations = {
  'search_setSearchParams'(state,payload){
    let requiredKeys = ['chosenGenre','chosenLO','chosenFeasts','chosenHora']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidSearchInput: Could not find required key ${key} in given searchParams object. ${payload}`);
    }
    state.incipitSearchParams = payload
  },
  'search_setSearchResult'(state,payload){
    state.incipitSearchResult = payload
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
  // 'search_setVizCompareQuery'(state,payload){
  //   state.vizCompareQuery = payload
  // }
}

const actions = {
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
  // 'search_setVizCompareQueryAction'({commit},payload){
  //   commit('search_setVizCompareQuery',payload)
  // }
}

const getters = {
  'search_getSearchParams'(state){
    return state.incipitSearchParams
  },
  'search_getSearchResult'(state){
    return state.incipitSearchResult
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
  // 'search_getVizCompareQuery'(state){
  //   return state.vizCompareQuery
  // }
}


export default {
  state,
  mutations,
  actions,
  getters
}
