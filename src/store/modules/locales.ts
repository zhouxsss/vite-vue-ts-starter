import type { LocaleSetting, LocaleType } from '/#/config';
import { LOCALE_KEY } from '/@/constants/cacheKeys'
import { localeSetting } from '/@/constants/localeSetting';
import { createStorage } from '/@/utils/storageCache'

const ls = createStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting;
}

const locales = {
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting
  }),
  getters: {
    getShowPicker(state): boolean {
      return !!state.localInfo?.showPicker;
    },
    getLocale(state): LocaleType {
      return state.localInfo?.locale ?? 'zh_CN';
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
        ...state.localeInfo
      })
    }
  },
  actions: {},
}

export default locales

