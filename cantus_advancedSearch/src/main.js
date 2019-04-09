import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.use(ClientTable);
Vue.use(VueResource);

export const EventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
