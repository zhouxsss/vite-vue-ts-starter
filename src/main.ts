import { createApp } from 'vue'
import setupStore from './store'
import setupRouter, { router } from './router'
import setupI18n from './locales/setupI18n'
import App from './App.vue'
import { registerGlobComp } from '/@/components/registerGlobComp'
import '/@/design/index.less'
import '/@/design/tailwind.css'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)
  await setupI18n(app)
  registerGlobComp(app)
  await router.isReady()

  app.mount('#app')
}

void bootstrap()
