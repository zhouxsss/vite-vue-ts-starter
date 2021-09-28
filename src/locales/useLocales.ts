import type { LocaleType } from '/#/config'

import { unref, computed } from 'vue'
import { i18n } from './setupI18n'
import { store } from '/@/store'
import { loadLocalePool, setHtmlPageLang, getFileNames } from './helper'

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  store.commit('setLocaleInfo', { locale })
  setHtmlPageLang(locale)
}

export function useLocales() {
  function getLocale() {
    return computed(() => store.getters.getLocale)
  }
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)

    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = (await import(`./lang/${locale}.ts`)).default
    if (!langModule) {
      return
    }
    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)
    setI18nLanguage(locale)
    return locale
  }

  function getLocaleList() {
    const fileModules = import.meta.globEager('./lang/*.ts')
    return getFileNames(fileModules)
  }

  return {
    getLocale,
    changeLocale,
    getLocaleList,
  }
}
