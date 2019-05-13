

const state = {
  //vizCompareQuery:'',
  incipitSearchParams:{
    chosenLO:'',
    chosenFeasts:'',
    chosenHora:'',
    chosenGenre:''

  },
  incipitSearchResult:undefined,
  incipitOngoingSearch: false,
  searchFailed:false,
  searchHistory:[]
}

const mutations = {
  'incipit_setSearchParams'(state,payload){
    let requiredKeys = ['chosenGenre','chosenLO','chosenFeasts','chosenHora']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidSearchInput: Could not find required key ${key} in given searchParams object. ${payload}`);
    }
    state.incipitSearchParams = payload
  },
  'incipit_setSearchResult'(state,payload){
    state.incipitSearchResult = payload
  },
  'incipit_markOngoingSearch'(state, payload = !state.incipitOngoingSearch){
    if((payload!== true) && (payload !==false)) console.error(`InvalidState: ongoingSearch must be a Boolean but got: ${payload}`)
    state.incipitOngoingSearch = payload
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
  'incipit_setSearchParamsAction'({commit},payload){
    commit('incipit_setSearchParams',payload)
  },
  'incipit_setSearchResultAction'({commit},payload){
    commit('incipit_setSearchResult',payload)
  },
  'incipit_markOngoingSearchAction'({commit},payload){
    commit('incipit_markOngoingSearch',payload)
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
  'incipit_getSearchParams'(state){
    return state.incipitSearchParams
  },
  'incipit_getSearchResult'(state){
    return state.incipitSearchResult
  },
  'incipit_getOngoingSearch'(state){
    return state.incipitOngoingSearch
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
