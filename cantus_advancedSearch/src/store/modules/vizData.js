

const state = {
  curVizData: {
    labels:undefined,
    datasets: undefined
  },
  vizDataStore: []

}

const mutations = {
  'viz_setCurVizData'(state,payload){
    let requiredKeys = ['labels','datasets']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidState: Couldn't find required key ${key} inside curVizData in vuex store. Given object was: ${payload}`)
    }
    state.curVizData = payload
  }

}

const actions = {
  'viz_setCurVizDataAction'({commit},payload){
    commit('viz_setCurVizData',payload)
  }

}

const getters = {
  'viz_getCurVizData'(state){
    return state.curVizData
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
