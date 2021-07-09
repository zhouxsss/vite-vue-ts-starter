/*
 * @Author: zhouxs
 * @Date: 2021-07-09 17:54:26
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 18:47:42
 * @Description: file content
 */

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}