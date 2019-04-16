

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

}


const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}
