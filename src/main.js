import {
    createApp
} from 'vue'
import App from './App.vue'
import axios from './axios'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import './them.scss'


let app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
app.config.globalProperties.$axios = axios; // 全局挂载写法一
app.provide('$axios', axios) // 全局挂载写法二
app.mount('#app')