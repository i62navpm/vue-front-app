import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'user',
      component: () =>
        import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
    {
      path: '/:modality/:specialty',
      name: 'specialtyTable',
      component: () =>
        import(/* webpackChunkName: "SpecialtyTable" */ './views/SpecialtyTable.vue'),
    },
  ],
})
