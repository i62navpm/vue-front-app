export default {
  state: {
    data: [],
  },
  mutations: {
    addNotification: (state, notification) =>
      (state.data = [...state.data, notification]),
    removeNotification: (state, index) =>
      (state.data = state.data.splice(index, 1)),
  },

  getters: {
    getNotifications: state => state.data,
  },
}
