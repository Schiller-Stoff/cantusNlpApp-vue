

const state = {
  curVizData: {
    labels:undefined,
    datasets: undefined
  },
  vizDataStore: [],

  vizCompareData:{}
}

const mutations = {
  'viz_setCurVizData'(state,payload){
    let requiredKeys = ['labels','datasets']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidState: Couldn't find required key ${key} inside curVizData in vuex store. Given object was: ${payload}`)
    }
    state.curVizData = payload
  },

  'viz_pushIntoVizDataStore'(state,payload){
    let requiredKeys = ['labels','datasets']
    for (let key of requiredKeys){
      if(!payload.hasOwnProperty(key))console.error(`InvalidState: Couldn't find required key ${key} inside vizDataStore in vuex store. Given object was: ${payload} and is still be pushed into array.`)
    }
    state.vizDataStore.push(payload)
  },

  'viz_setVizCompareData'(state,payload){
    state.vizCompareData = payload
  }

}

const actions = {
  'viz_setCurVizDataAction'({commit},payload){
    commit('viz_setCurVizData',payload)
  },
  'viz_pushIntoVizDataStoreAction'({commit},payload){
    commit('viz_pushIntoVizDataStore',payload)
  },
  'viz_setVizCompareDataAction'({commit},payload){
    commit('viz_setVizCompareData',payload)
  }

}

const getters = {
  'viz_getCurVizData'(state){
    return state.curVizData
  },
  'viz_getVizDataStore'(state){
    return state.vizDataStore
  },
  'viz_getVizCompareData'(state){
    return state.vizCompareData
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
