import type { LocaleSetting, LocaleType } from '/#/config'
import { LOCALE_KEY } from '/@/constants/cacheKeys'
import { localeSetting } from '/@/constants/localeSetting'
import { createStorage } from '/@/utils/storageCache'

const ls = createStorage({ storage: window.localStorage })

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

export interface LocaleState {
  localeInfo: LocaleSetting
}

const locales = {
  state: (): LocaleState => ({
    localeInfo: lsLocaleSetting,
  }),
  getters: {
    getLocale(state): LocaleType {
      return state.localeInfo?.locale || localeSetting.locale
    },
  },
  mutations: {
    setLocaleInfo(state, info: Partial<LocaleSetting>) {
      state.localeInfo = { ...state.localeInfo, ...info }
      ls.set(LOCALE_KEY, state.localeInfo)
    },
    initLocale(state) {
      state.setLocaleInfo({
        ...localeSetting,
        ...state.localeInfo,
      })
    },
  },
  actions: {},
}

export default locales
