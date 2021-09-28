import { i18n } from '/@/locales/setupI18n'

type I18nGlobalTranslation = {
  (key: string): string
  (key: string, locale: string): string
  (key: string, locale: string, list: unknown[]): string
  (key: string, locale: string, named: Record<string, unknown>): string
  (key: string, list: unknown[]): string
  (key: string, named: Record<string, unknown>): string
}

type I18nTranslationRestParameters = [string, any]

export default function useI18n(): {
  t: I18nGlobalTranslation
} {
  const normalFn = {
    t: (key: string) => {
      return key
    },
  }
  if (!i18n) {
    return normalFn
  }

  const { t, ...methods } = i18n.global

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return ''
    if (!key.includes('.')) return key
    return t(key, ...(arg as I18nTranslationRestParameters))
  }
  return {
    ...methods,
    t: tFn,
  }
}
