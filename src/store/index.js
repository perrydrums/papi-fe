import Vue from 'vue'
Vue.use(Vuex);
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    patchID: 'No PatchID found! Error!'
  },
  mutations: {
    setPatchID (state, payload) {
      console.log('[STORE:PatchID]', payload);
      state.patchID = payload;
    }
  }
});

export default store;
