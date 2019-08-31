import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import sidebar from './modules/sidebar'
import notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['sidebar', 'notifications'],
    }),
  ],
  modules: {
    sidebar,
    notifications,
  },
})
