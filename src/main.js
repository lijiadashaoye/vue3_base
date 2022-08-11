import {
    createApp
} from 'vue'
import App from './App.vue'
import axios from './axios'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import './them.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


let app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios; // 全局挂载写法一，适合用在非setup里
app.provide('$axios', axios) // 全局挂载写法二，适合用在setup里
app.mount('#app')