/*
 * @Author: zhouxs
 * @Date: 2021-07-08 18:16:41
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 19:11:08
 * @Description: file content
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../views/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/tailwind',
    name: 'Tailwind',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/Tailwind.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
