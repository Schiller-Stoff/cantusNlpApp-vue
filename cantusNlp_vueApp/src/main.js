import Vue from 'vue'
import App from './App.vue'
import VueTour from 'vue-tour'
import Notifications from 'vue-notification'
import VueResource from 'vue-resource'

Vue.use(VueResource);

require('vue-tour/dist/vue-tour.css');

Vue.use(VueTour);
Vue.use(Notifications);

export const EventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
