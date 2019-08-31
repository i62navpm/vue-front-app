export default {
  state: {
    open: false,
  },
  mutations: {
    setSidebar: (state, open) => (state.open = open),
  },
  actions: {
    setSidebar: ({ commit }, { open }) => commit('setSidebar', open),
  },
  getters: {
    getSidebar: state => state.open,
  },
}
