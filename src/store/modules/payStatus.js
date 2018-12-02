import { fb } from '@/plugins/firebaseFunctions'
import { captureException } from '@sentry/browser'

export default {
  state: {
    paid: false,
    loading: false,
  },
  mutations: {
    setPaid: (state, status) => (state.paid = status),
    setPaidLoading: (state, status) => (state.loading = status),
  },
  actions: {
    setPaid: ({ commit }, status) => commit('setPaid', status),
    setPaidLoading: ({ commit }, status) => commit('setPaidLoading', status),
    checkPaid: async ({ commit, getters }) => {
      try {
        commit('setPaidLoading', true)
        const { data } = await fb.httpsCallable('hasPaid')({
          email: getters.getAuth.email,
          time: new Date().getTime(),
        })
        commit('setPaid', !!data)
      } catch (err) {
        captureException(err)
      } finally {
        commit('setPaidLoading', false)
      }
    },
  },
  getters: {
    hasPaid: state => state.paid,
    isLoading: state => state.loading,
  },
}
