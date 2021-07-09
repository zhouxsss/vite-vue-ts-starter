/*
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 19:06:51
 * @Description: file content
 */
import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(store, key)
app.use(router)

app.mount('#app')
