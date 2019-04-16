import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import store from './store/store';

Vue.use(ClientTable);
Vue.use(VueResource);

export const EventBus = new Vue();

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
