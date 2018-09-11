import { db } from '@/plugins/firestore'
import searchUtils from '@/utils/search'

const search = searchUtils(db)

export default {
  state: {
    open: false,
    loading: {
      normalList: true,
      bilingualList: true,
      voluntaryList: true,
    },
  },
  mutations: {
    setSearchDialog: (state, open) => (state.open = open),
    stopLoad: (state, list) => (state.loading[list] = false),
    startLoad: (state, list) => (state.loading[list] = true),
  },
  actions: {
    openSearchDialog: async ({ commit, dispatch }, person) => {
      commit('setSearchDialog', true)
      const staticLists = ['normalList', 'bilingualList', 'voluntaryList']
      let [
        normalPromise,
        bilingualPromise,
        voluntaryPromise,
      ] = await search.getSearch(person, staticLists)

      normalPromise.then(() => commit('stopLoad', 'normalList'))
      bilingualPromise.then(() => commit('stopLoad', 'bilingualList'))
      voluntaryPromise.then(() => commit('stopLoad', 'voluntaryList'))

      return Promise.all([normalPromise, bilingualPromise, voluntaryPromise])
        .then(result =>
          result
            .reduce((acc, curr, index) => {
              for (let [specialty, values] of Object.entries(curr)) {
                values = values.map(item => ({
                  ...item,
                  specialty,
                  modality: staticLists[index],
                }))
                acc.push(...values)
              }
              return acc
            }, [])
            .sort((a, b) => a.position - b.position)
        )
        .finally(() => dispatch('closeSearchDialog'))
    },
    closeSearchDialog: ({ commit }) => {
      setTimeout(() => commit('setSearchDialog', false), 300)
      setTimeout(() => {
        commit('startLoad', 'normalList')
        commit('startLoad', 'bilingualList')
        commit('startLoad', 'voluntaryList')
      }, 500)
    },
  },
  getters: {
    getSearchDialog: state => state.open,
  },
}
