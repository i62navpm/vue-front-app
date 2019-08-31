export default {
  state: {
    data: [],
  },
  mutations: {
    addNotification: (state, notification) => {
      state.data = [{ ...notification, viewed: false }, ...state.data]
      state.new = true
    },
    setViewedNotification: (state, index) => (state.data[index].viewed = true),
    removeNotification: (state, index) => state.data.splice(index, 1),
  },

  getters: {
    getNotifications: state => state.data,
  },
}
