import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'

import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { localeSetting } from '/@/constants/localeSetting'
import { store } from '/@/store'

export let i18n: ReturnType<typeof createI18n>

const { fallback, availableLocales } = localeSetting

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = store.getters.getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
    legacy: false, // you must set `false`, to use Composition API,
    globalInjection: true,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export default async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
