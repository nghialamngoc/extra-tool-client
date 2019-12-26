import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/Articles.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/Article.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
