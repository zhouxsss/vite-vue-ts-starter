declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'ant-design-vue/es/locale/*' {
  import { Locale } from 'ant-design-vue/types/locale-provider'
  const locale: Locale & ReadonlyRecordable
  export default locale as Locale & ReadonlyRecordable
}

declare module 'moment/dist/locale/*' {
  import { LocaleSpecification } from 'moment'
  const locale: LocaleSpecification & ReadonlyRecordable
  export default locale
}