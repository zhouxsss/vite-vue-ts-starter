export type LocaleType = 'zh_CN' | 'en'

export interface LocaleSetting {
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface SelectOption {
  title: String,
  value: String | Number
}