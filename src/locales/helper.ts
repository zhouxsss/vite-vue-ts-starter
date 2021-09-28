import type { LocaleType } from '/#/config'
import type { Recordable } from '/#/global'
import { MenuType } from '/@/constants/menus'

import { set } from 'lodash-es'

interface LocaleMenuType {
  title: LocaleType
}

interface LocaleMenuType extends Pick<MenuType, 'key' | 'iconPath'> {}

// 闭包变量存储全局 locale
export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

// 按文件夹命名 message
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {}

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}

export function genImage(images) {
  const obj: Recordable = {}
  Object.keys(images).forEach((key) => {
    let fileName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    obj[fileName] = images[key].default
  })
  return obj
}

export function getFileNames(fileModules): Array<LocaleMenuType> {
  const arr: Array<LocaleMenuType> = []
  Object.keys(fileModules).forEach((key) => {
    let fileName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const content = fileModules[key].default
    let obj = {
      key: fileName,
      title: content.title,
      iconPath: content.message.images.flag || '',
    } as LocaleMenuType
    arr.push(obj)
  })
  return arr
}
