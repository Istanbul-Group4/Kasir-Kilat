import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/FormLogin.vue'
import Board from '../components/Board.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/playgame',
    name: 'Board',
    component: Board
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
