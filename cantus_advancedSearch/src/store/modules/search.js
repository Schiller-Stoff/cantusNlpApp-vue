

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
  }
}

const actions = {
  'search_modifyCurSearchQueryAction'({commit},payload){
    commit('search_modifyCurSearchQuery',payload)
  }
}

const getters = {
  'search_getCurSearchQuery'(state){
    return state.curSearchQuery
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
