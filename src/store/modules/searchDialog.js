export default {
  state: {
    open: false,
  },
  mutations: {
    setSearchDialog: (state, open) => (state.open = open),
  },
  actions: {
    setSearchDialog: ({ commit }, open) => commit('setSearchDialog', open),
  },
  getters: {
    getSearchDialog: state => state.open,
  },
}
