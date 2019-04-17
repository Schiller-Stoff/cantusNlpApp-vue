import Vue from 'vue';
import Vuex from 'vuex';

import interfaceStates from './modules/interfaceStates';
import search from './modules/search';
import vizData from './modules/vizData'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    interfaceStates,
    search,
    vizData
  }
});
