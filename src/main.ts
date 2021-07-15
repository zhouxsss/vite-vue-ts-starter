import { createApp } from 'vue'
import setupStore from './store'
import router from './router'
import { i18n } from './locales/setupI18n'
import App from './App.vue'
import { registerGlobComp } from '/@/components/registerGlobComp';

const app = createApp(App)

setupStore(app)
app.use(router)
app.use(i18n)
registerGlobComp(app)

app.mount('#app')
