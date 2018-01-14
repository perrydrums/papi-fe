import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import store from './store'

Vue.use(Vuetify);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
