import Vue from 'vue'
import Router from 'vue-router'
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
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
    {
      path: '/:modality/:specialty',
      name: 'specialtyTable',
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "SpecialtyTable" */ './views/SpecialtyTable.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getAuth.email) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
