import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import sidebar from './modules/sidebar'
import searchDialog from './modules/searchDialog'
import loginDialog from './modules/loginDialog'
import home from './modules/home'
import notifications from './modules/notifications'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['sidebar', 'auth', 'home', 'notifications'],
    }),
  ],
  modules: {
    sidebar,
    searchDialog,
    loginDialog,
    auth,
    home,
    notifications,
  },
  state: {},
  mutations: {},
  actions: {},
})
