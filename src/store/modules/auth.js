import firebase from 'firebase/app'

export default {
  state: {
    user: {},
    messaging: null,
    loading: false,
  },
  mutations: {
    setAuth: (state, { user }) => {
      state.user = user
    },
    setMessaging: (state, { messaging }) => {
      state.messaging = messaging
    },
    setLoading: (state, loading) => (state.loading = loading),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
    logout: async ({ commit }) => {
      await firebase.auth().signOut()
      commit('setAuth', { user: {} })
      commit('setMessaging', { messaging: null })
    },
  },
  getters: {
    getAuth: state => state.user,
  },
}
