import Vue from 'vue'
import Router from 'vue-router'
import VueScrollTo from 'vue-scrollto'
import Home from './views/Home.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'user',
      meta: { requiresAuth: true, requiresPaid: true },
      component: () =>
        import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
    {
      path: '/:modality/:specialty',
      name: 'specialtyTable',
      meta: { requiresAuth: true, requiresPaid: true },
      component: () =>
        import(/* webpackChunkName: "SpecialtyTable" */ './views/SpecialtyTable.vue'),
    },
    {
      path: '/legal/doc/terms-of-service',
      name: 'termsOfService',
      component: () =>
        import(/* webpackChunkName: "TermsOfService" */ './views/TermsOfService.vue'),
    },
    {
      path: '/legal/doc/privacy-policy',
      name: 'privacyPolicy',
      component: () =>
        import(/* webpackChunkName: "PrivacyPolicy" */ './views/PrivacyPolicy.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getAuth.email) {
      store.dispatch('openLoginDialog')
      next({ name: 'home' })
    } else if (to.matched.some(record => record.meta.requiresPaid)) {
      if (!store.getters.hasPaid) {
        next({ name: 'home' })
        store.commit('setSidebar', false)
        VueScrollTo.scrollTo('#pricing', 200, {
          easing: 'ease-in',
          offset: -125,
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
