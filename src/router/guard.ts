import type { Router } from 'vue-router'

import { Modal, notification } from 'ant-design-vue'
import paths from '../constants/paths'
import { store } from '/@/store'
const allPaths = Object.values(paths)

export function setupRouterGuard(router: Router) {
  createScrollGuard(router)
  createMessageGuard(router)
  createPermissionGuard(router)
}

export function createScrollGuard(router: Router) {
  let keepScroll = {}
  router.afterEach((to, from) => {
    // 记录滚动位置
    if (from.meta.keepAlive) {
      keepScroll[from.path] =
        document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop
    }
    // 从列表页到详情页设置缓存标志
    if (from.name === 'Detail' && to.name === 'Market') {
      to.meta.isUseCache = true
    }
    // 跳转滚动条
    if (to.meta.keepAlive) {
      setTimeout(() => window.scrollTo(0, keepScroll[to.path]), 0)
    } else {
      window.scrollTo(0, 0)
    }
    return true
  })
}

export function createMessageGuard(router: Router) {
  router.beforeEach(() => {
    try {
      Modal.destroyAll()
      notification.destroy()
    } catch (error) {
      console.warn('message guard error:' + error)
    }
    return true
  })
}

export function createPermissionGuard(router: Router) {
  router.beforeEach((to) => {
    if (!to.matched.length || (to.meta.requiresAuth && !store.getters.getToken)) {
      return {
        path: paths.home,
      }
    }
  })
}
