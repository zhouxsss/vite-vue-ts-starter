export default {
  state() {
    return {
      isNeedBlur: false,
    }
  },
  mutations: {
    setIsNeedBlur(state, status) {
      state.isNeedBlur = status
    },
  },
}
