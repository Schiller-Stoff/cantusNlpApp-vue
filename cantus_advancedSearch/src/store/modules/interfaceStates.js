

const state = {
  searchBarEnlarged:false
}

const mutations = {
  'interfaceStates_enlargeSearchBar'(state){
    state.searchBarEnlarged = true;
  },

  'interfaceStates_minifySearchBar'(state){
    state.searchBarEnlarged = false;
  }
}

const actions = {
  'interfaceStatesAction_enlargeSearchBar'({commit}){
    commit('interfaceStates_enlargeSearchBar')
  },
  'interfaceStatesAction_minifySearchBar'({commit}){
    commit('interfaceStates_minifySearchBar')
  }
}


const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}
