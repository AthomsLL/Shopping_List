import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingView from '../views/ShoppingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shopping',
    component: ShoppingView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
