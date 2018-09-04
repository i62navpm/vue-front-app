export default {
  state: {
    user: {},
    credential: {},
  },
  mutations: {
    setAuth: (state, { user, credential }) => {
      state.user = user
      state.credential = credential
    },
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
  },
  getters: {
    getAuth: state => state.auth,
  },
}
