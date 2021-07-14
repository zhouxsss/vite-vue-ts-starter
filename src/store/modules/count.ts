export interface CountState {
  count: number
}

export default {
  state() {
    return {
      count: 1
    }
  },
  mutations: {
    increment(state: CountState) {
      state.count++
    }
  }
}