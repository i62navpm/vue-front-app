import firebase from 'firebase/app'

export default {
  state: {
    user: {},
    credential: {},
    messaging: null,
    loading: false,
  },
  mutations: {
    setAuth: (state, { user, credential, messaging }) => {
      state.user = user
      state.credential = credential
      state.messaging = messaging
    },
    setLoading: (state, loading) => (state.loading = loading),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
    logout: async ({ commit }) => {
      await firebase.auth().signOut()
      commit('setAuth', { user: {}, credential: {}, messaging: {} })
    },
  },
  getters: {
    getAuth: state => state.user,
  },
}
