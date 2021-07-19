import '/@/design/index.less'
import '/@/design/tailwind.css'
import { createApp } from 'vue'
import setupStore from './store'
import router from './router'
import setupI18n from './locales/setupI18n'
import App from './App.vue'
import { registerGlobComp } from '/@/components/registerGlobComp'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  app.use(router)
  await setupI18n(app)
  registerGlobComp(app)

  app.mount('#app')
}

void bootstrap()
