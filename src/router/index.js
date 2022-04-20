import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/highscore',
    name: 'Highscore',
    component: () => import('../views/HighscoreView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/Question.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
