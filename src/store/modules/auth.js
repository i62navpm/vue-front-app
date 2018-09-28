import firebase from 'firebase/app'
import { db } from '@/plugins/firestore'
import { fb } from '@/plugins/firebaseFunctions'

export default {
  state: {
    user: {},
    messaging: null,
    loading: false,
  },
  mutations: {
    setAuth: (state, { user }) => {
      state.user = user
    },
    setMessaging: (state, { messaging }) => {
      state.messaging = messaging
    },
    setLoading: (state, loading) => (state.loading = loading),
    setEmailNotifications: (state, value = false) =>
      (state.user.emailNotifications = value),
    setPushNotifications: (state, value = false) =>
      (state.user.pushNotifications = value),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
    toggleEmailNotifications: async ({ commit, state }, value) => {
      try {
        let querySnapshot = await db
          .collection('users')
          .where('email', '==', state.user.email)
          .get()
        querySnapshot.forEach(async doc => {
          await doc.ref.update({
            emailNotifications: value,
          })
        })
        commit('setEmailNotifications', value)
        return true
      } catch (err) {
        return err
      }
    },
    togglePushNotifications: async ({ commit, state }, value) => {
      try {
        let querySnapshot = await db
          .collection('users')
          .where('email', '==', state.user.email)
          .get()
        querySnapshot.forEach(async doc => {
          await doc.ref.update({
            pushNotifications: value,
          })
        })

        let googleFn = value
          ? fb.httpsCallable('setMessagingToken')
          : fb.httpsCallable('deleteMessagingToken')

        await googleFn(state.messaging)

        commit('setPushNotifications', value)
        return true
      } catch (err) {
        throw new Error(err)
      }
    },
    logout: async ({ commit }) => {
      await firebase.auth().signOut()
      commit('setAuth', { user: {} })
      commit('setMessaging', { messaging: null })
    },
    remove: async ({ dispatch, state }) => {
      try {
        let user = firebase.auth().currentUser
        let querySnapshot = await db
          .collection('users')
          .where('email', '==', state.user.email)
          .get()

        await fb.httpsCallable('deleteMessagingToken')(state.messaging)
        await querySnapshot.forEach(doc => doc.ref.delete())
        await fb.httpsCallable('removeUser')({ uid: user.uid })
        return dispatch('logout')
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  getters: {
    getAuth: state => state.user,
  },
}
