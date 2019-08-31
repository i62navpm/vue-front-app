import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../../config/firebase'

Vue.use(firestorePlugin)

firebase.initializeApp(config)

export const db = firebase.firestore()
