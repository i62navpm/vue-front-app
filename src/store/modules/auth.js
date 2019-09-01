import firebase from 'firebase/app'
import { captureException } from '@sentry/browser'
import { db } from '@/plugins/firestore'
import { fb } from '@/plugins/firebaseFunctions'

export default {
  state: {
    user: {},
    messaging: null,
    myUser: null,
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
    setMyUser: (state, value) => (state.myUser = value),
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
        captureException(err)
        return err
      }
    },
    togglePushNotifications: async ({ commit, state }, value) => {
      try {
        let googleFn = value
          ? fb.httpsCallable('messagingTokenSet')
          : fb.httpsCallable('messagingTokenDelete')

        await googleFn(state.messaging)

        let querySnapshot = await db
          .collection('users')
          .where('email', '==', state.user.email)
          .get()
        querySnapshot.forEach(async doc => {
          await doc.ref.update({
            pushNotifications: value,
          })
        })

        commit('setPushNotifications', value)
        return true
      } catch (err) {
        captureException(err)
        throw new Error(err)
      }
    },
    logout: async ({ commit }) => {
      await firebase.auth().signOut()
      commit('setAuth', { user: {} })
      commit('setMessaging', { messaging: null })
      commit('setMyUser', null)
      commit('setPaid', false)
    },
    setMyUser: async ({ commit, state }, { privateProfile, myUser }) => {
      const query = await db
        .collection('users')
        .where('email', '==', state.user.email)
        .get()
      if (!query.empty) {
        const [doc] = query.docs
        await doc.ref.update({
          myUser: {
            ...myUser,
            privateProfile,
          },
        })
      }

      if (privateProfile) {
        db.collection('privateProfiles')
          .doc(state.user.email)
          .set({
            ...myUser,
            createdAt: new Date().toISOString(),
          })
      } else {
        await db
          .collection('privateProfiles')
          .doc(state.user.email)
          .delete()
      }

      commit('setMyUser', { ...myUser, privateProfile })
    },
    remove: async ({ dispatch, state }) => {
      try {
        let user = firebase.auth().currentUser
        let querySnapshot = await db
          .collection('users')
          .where('email', '==', state.user.email)
          .get()

        await fb.httpsCallable('messagingTokenDelete')(state.messaging)
        await querySnapshot.forEach(doc => doc.ref.delete())
        await db
          .collection('privateProfiles')
          .doc(state.user.email)
          .delete()
        await fb.httpsCallable('removeUser')({ uid: user.uid })
        return dispatch('logout')
      } catch (err) {
        captureException(err)
        throw new Error(err)
      }
    },
  },
  getters: {
    getAuth: state => state.user,
    getAuthLoading: state => state.loading,
  },
}
