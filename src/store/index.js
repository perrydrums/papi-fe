import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

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
