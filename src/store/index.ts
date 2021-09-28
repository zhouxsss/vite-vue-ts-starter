import { InjectionKey } from 'vue'
import { createStore, Store, createLogger } from 'vuex'
import locales, { LocaleState } from './modules/locales'
import user, { UserState } from './modules/user'
import count, { CountState } from './modules/count'

export type State = {
  locales?: LocaleState
  count?: CountState
  user?: UserState
}

export const storeKey: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore({
  modules: {
    locales,
    user,
    count,
  },
  plugins: import.meta.env.MODE === 'development' ? [createLogger()] : [],
})

export default function setupStore(app) {
  app.use(store, storeKey)
}
