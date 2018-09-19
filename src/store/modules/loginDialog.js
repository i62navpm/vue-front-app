export default {
  state: {
    open: false,
  },
  mutations: {
    setLoginDialog: (state, open) => (state.open = open),
  },
  actions: {
    openLoginDialog: async ({ commit }) => commit('setLoginDialog', true),
    closeLoginDialog: ({ commit }) => commit('setLoginDialog', false),
  },
  getters: {
    getLoginDialog: state => state.open,
  },
}
