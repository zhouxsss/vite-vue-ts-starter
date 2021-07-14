/*
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 19:41:44
 * @Description: file content
 */
import { createApp } from 'vue'
import { store } from './store'
import router from './router'
import { i18n } from './locales/setupI18n'
import App from './App.vue'
import { registerGlobComp } from '/@/components/registerGlobComp';

// import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
registerGlobComp(app)

app.mount('#app')
