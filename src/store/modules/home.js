import { db } from '@/plugins/firestore'
import statsUtils from '@/utils/stats'

const stats = statsUtils(db)

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
    setStats: async ({ commit }) => {
      let data = await stats.getStats([
        'assignmentList',
        'citationList',
        'voluntaryListDynamic',
        'incorporateList',
        'bilingualList',
        'normalList',
        'voluntaryList',
        'nextCitationList',
      ])
      commit('setHome', data)
    },
  },
  getters: {
    getHome: state => state.data,
  },
}
