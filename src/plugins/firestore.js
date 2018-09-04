import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../../config/firebase'
Vue.use(VueFire)

firebase.initializeApp(config)

export const db = firebase.firestore()
