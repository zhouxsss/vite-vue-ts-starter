import { TOKEN_KEY, USER_KEY } from '/@/constants/cacheKeys'
import { createStorage } from '/@/utils/storageCache'

const ls = createStorage({ storage: window.localStorage })

const storageToken = ls.get(TOKEN_KEY)
const storageUserInfo = ls.get(USER_KEY)
export interface UserState {
  isLogin: boolean
  username: String
  accountId: String
  token: string
  isLoginVisible: boolean //  是否展示登录弹窗
  useri: Number
}

export default {
  state() {
    return {
      isLogin: !!storageToken,
      username: storageUserInfo?.username || '',
      accountId: storageUserInfo?.accountId || '',
      token: storageToken || '',
      isLoginVisible: false,
    }
  },
  getters: {
    getToken(state): UserState {
      return state.token
    },
    getLoginVisible(state): UserState {
      return state.isLoginVisible
    },
    getIsLogin(state): Boolean {
      return state.isLogin
    },
  },
  mutations: {
    setIsLogin(state: UserState, status) {
      state.isLogin = status
    },
    setLoginVisible(state: UserState, status) {
      state.isLoginVisible = status
    },
    setUserTokenAndStore(state: UserState, token) {
      state.token = token
      ls.set(TOKEN_KEY, token)
    },
    setUserInfoAndStore(state: UserState, data) {
      const { username, accountId } = data
      state.username = username
      state.accountId = accountId
      ls.set(USER_KEY, data)
    },
    setUser(state: UserState, payload: UserState) {
      Object.keys(payload).map((key) => (state[key] = payload[key]))
    },
  },
  actions: {
    loginOut({ commit }) {
      commit('setIsLogin', false)
      commit('setUserInfoAndStore', '')
      commit('setUserTokenAndStore', '')

      ls.remove(USER_KEY)
      ls.remove(TOKEN_KEY)
    },
  },
}
