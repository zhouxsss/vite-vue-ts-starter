// import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import locales from './modules/locales'
import count from './modules/count'

// export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    locales,
    count
  }
})
