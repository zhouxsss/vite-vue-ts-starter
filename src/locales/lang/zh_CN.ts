import { genMessage, genImage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/zh_CN'
// import momentLocale from 'moment/dist/locale/zh-cn'

const modules = import.meta.globEager('./zh_CN/**/*.ts')
const imageModules = import.meta.globEager('../imgs/zh_CN/*')
export default {
  title: 'ZH',
  message: {
    ...genMessage(modules, 'zh_CN'),
    antdLocale,
    images: {
      ...genImage(imageModules),
    },
  },
  // momentLocale,
  // momentLocaleName: 'zh-cn',
}
