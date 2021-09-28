import type { LocaleSetting, LocaleType } from '/#/config'

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
}

export const localeSetting: LocaleSetting = {
  locale: LOCALE.EN_US,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
}
