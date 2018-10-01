export default {
  state: {
    open: false,
    newUser: false,
  },
  mutations: {
    setLoginDialog: (state, open) => (state.open = open),
    setNewUserDialog: (state, open) => (state.newUser = open),
  },
  actions: {
    openLoginDialog: ({ commit }) => commit('setLoginDialog', true),
    closeLoginDialog: ({ commit }) => commit('setLoginDialog', false),
    openNewUserDialog: ({ commit }) => commit('setNewUserDialog', true),
    closeNewUserDialog: ({ commit }) => commit('setNewUserDialog', false),
  },
  getters: {
    getLoginDialog: state => state.open,
  },
}
