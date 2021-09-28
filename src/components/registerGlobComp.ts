import type { App, Plugin } from 'vue'
import {
  // Need
  Button,
  Input,
  Layout,
  Form,
  Select,
} from 'ant-design-vue'
import Overlay from './Overlay/index.vue'
import Popup from './Popup/index.vue'
import Container from './Layout/container.vue'
import Modal from './Modal/index.vue'
const useList = [Form, Form.Item, Select, Select.Option]
const compList = [Container, Overlay, Popup, Modal]

export function registerGlobComp(app: App) {
  useList.forEach((comp) => {
    app.use(comp as Plugin)
  })

  compList.forEach((comp) => {
    app.component(comp.name, comp)
  })

  app.use(Input).use(Button).use(Layout)
}
