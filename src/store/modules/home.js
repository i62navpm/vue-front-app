export default {
  state: {
    data: {},
  },
  mutations: {
    setHome: (state, data) => (state.data = data),
  },
  actions: {
    setHome: ({ commit }, { data }) => commit('setHome', data),
  },
  getters: {
    getHome: state => state.data,
  },
}
