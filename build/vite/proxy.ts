/*
 * @Author: zhouxs
 * @Date: 2021-07-12 18:30:22
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 18:40:17
 * @Description: file content
 */
/** Use to parse the .env.development proxy configuration */

import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string}>

const httpsReg = /^https:\/\//

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target)
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? {secure: false} : {})
    }
  }
  return ret
}