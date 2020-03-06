import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

// the function continues in the second panel, not enough space here
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/module/:moduleId/session/:sessionId',
    name: 'Sessions',
    component: () => import(/* webpackChunkName: "exercise" */ '../components/Session.vue'),
    beforeEnter
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import(/* webpackChunkName: "exercise" */ '../components/Exercise.vue'),
    beforeEnter
  },
  {
    path: '/modules',
    name: 'Modules',
    component: () => import(/* webpackChunkName: "exercise" */ '../components/Modules.vue'),
    beforeEnter
  }
]

export default new VueRouter({
  routes
})
