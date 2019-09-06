import getStats from '@/utils/stats'

export default {
  state: {
    data: null,
  },
  mutations: {
    setHome: (state, data) => (state.data = data),
  },
  actions: {
    setHome: ({ commit }, data) => {
      commit('setHome', data)
    },
    setStats: ({ commit }) => {
      commit(
        'setHome',
        getStats(['normalList', 'bilingualList', 'voluntaryList'])
      )
    },
  },
  getters: {
    getHome: state => state.data,
  },
}
