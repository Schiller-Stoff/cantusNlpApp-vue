import Vue from 'vue'
import App from './App.vue'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)


export const EventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
