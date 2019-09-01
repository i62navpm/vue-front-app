import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import './plugins/vuetify'
import './plugins/firebase'
import './plugins/firestore'
import './plugins/firebaseFunctions'
import './plugins/firebaseMessaging'
// import './plugins/firebaseStorage'
// import './plugins/sentry'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters'

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
