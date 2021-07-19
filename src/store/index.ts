import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import locales, { LocaleState } from './modules/locales'
import count, { CountState } from './modules/count'

export type State = {
  locales?: LocaleState
  count?: CountState
}

export const key: InjectionKey<Store<State>> = Symbol('key')

export const store = createStore({
  modules: {
    locales,
    count,
  },
})

export default function setupStore(app) {
  app.use(store, key)
}
