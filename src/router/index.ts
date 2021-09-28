import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupRouterGuard } from './guard'
import Layout from '/@/components/Layout/index.vue'
import paths from '../constants/paths'

type RouteConfig = RouteRecordRaw & { hidden?: boolean }

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: paths.home,
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '/@/views/Home/index.vue'),
      },
      {
        path: paths.user,
        name: 'User',
        component: () => import(/* webpackChunkName: "lottery" */ '/@/views/User/index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
  // scrollBehavior: (to) => (to.meta.keepAlive ? {} : { left: 0, top: 0 }),
  // scrollBehavior (to, from, savedPosition) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({ left: 0, top: 0 })
  //     }, 2000)
  //   })
  // }
})

export default function setupRouter(app: App<Element>) {
  app.use(router)
  setupRouterGuard(router)
}
