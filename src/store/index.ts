/*
 * @Author: zhouxs
 * @Date: 2021-07-09 10:09:04
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 18:57:11
 * @Description: file content
 */
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  mutations: {
    increment(state: State) {
      state.count++
    }
  }
})
