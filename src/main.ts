/*
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 19:41:44
 * @Description: file content
 */
import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'
import { registerGlobComp } from '/@/components/registerGlobComp';

// import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(store, key)
app.use(router)

registerGlobComp(app);

app.mount('#app')
