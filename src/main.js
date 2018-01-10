import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import VueQrcodeReader from 'vue-qrcode-reader'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuetify);
Vue.use(VueQrcodeReader);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
