import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import sidebar from './modules/sidebar'
import home from './modules/home'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  modules: {
    sidebar,
    auth,
    home,
  },
  state: {},
  mutations: {},
  actions: {},
})
