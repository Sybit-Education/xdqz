import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/highscore',
    name: 'Highscore',
    component: () => import(/* webpackChunkName: "highscore" */ '../views/HighscoreView.vue')
  },
  {
    path: '/end',
    name: 'End',
    component: () => import('../views/End.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/Question.vue')
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: () =>
      import(/* webpackChunkName: "solutions" */ '../views/SolutionsView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
