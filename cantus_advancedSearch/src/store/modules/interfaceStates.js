

const state = {
  searchBarEnlarged:false,
  searchBarLocked:false
}

const mutations = {
  'interfaceStates_enlargeSearchBar'(state){
    state.searchBarEnlarged = true;
  },
  'interfaceStates_minifySearchBar'(state){
    state.searchBarEnlarged = false;
  },
  'interfaceStates_lockSearchbar'(state){
    state.searchBarLocked = true
  },
  'interfaceStates_unlockSearchbar'(state){
    state.searchBarLocked = false
  }
}

const actions = {
  'interfaceStatesAction_enlargeSearchBar'({commit}){
    commit('interfaceStates_enlargeSearchBar')
  },
  'interfaceStatesAction_minifySearchBar'({commit}){
    commit('interfaceStates_minifySearchBar')
  },
  'interfaceStatesAction_lockSearchbar'({commit}){
    commit('interfaceStates_lockSearchbar')
  },
  'interfaceStatesAction_unlockSearchbar'({commit}){
    commit( 'interfaceStates_unlockSearchbar')
  }
}


const getters = {
  interfaceStates_currentSearchBarState(state){
    return state.searchBarEnlarged
  },
  interfaceStates_currentSearchLockState(state){
    return state.searchBarLocked
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
