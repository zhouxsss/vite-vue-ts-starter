import { genMessage, genImage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/en_US'
// import momentLocale from 'moment/dist/locale/en'

const modules = import.meta.globEager('./en/**/*.ts')
const imageModules = import.meta.globEager('../imgs/en/*')
export default {
  title: 'EN',
  message: {
    ...genMessage(modules, 'en'),
    antdLocale,
    images: {
      ...genImage(imageModules),
    },
  },
  // momentLocale,
  // momentLocaleName: 'en',
}
