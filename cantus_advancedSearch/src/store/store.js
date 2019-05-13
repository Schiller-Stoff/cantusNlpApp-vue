import Vue from 'vue';
import Vuex from 'vuex';

import interfaceStates from './modules/interfaceStates';
import incipitSearch from './modules/incipitSearch';
import vizData from './modules/vizData'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    interfaceStates,
    incipitSearch,
    vizData
  }
});
