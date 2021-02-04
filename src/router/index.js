import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue')
      },
      {
        path: '/archive',
        name: 'archive',
        component: () => import(/* webpackChunkName: "archive" */ '@/pages/Archive.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import(/* webpackChunkName: "category" */ '@/pages/Category.vue')
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import(/* webpackChunkName: "tags" */ '@/pages/Tags.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
