import firebase from 'firebase/app'

export default {
  state: {
    user: {},
    credential: {},
    loading: false,
  },
  mutations: {
    setAuth: (state, { user, credential }) => {
      state.user = user
      state.credential = credential
    },
    setLoading: (state, loading) => (state.loading = loading),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
    logout: async ({ commit }) => {
      await firebase.auth().signOut()
      commit('setAuth', { user: {}, credential: {} })
    },
  },
  getters: {
    getAuth: state => state.user,
  },
}
