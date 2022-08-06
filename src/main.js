import {
    createApp
} from 'vue'
import App from './App.vue'
import axios from './axios'
import router from './router'
import store from './store'

let app = createApp(App).use(router).use(store)
app.config.globalProperties.$axios = axios; // 全局挂载写法一
app.provide('$axios', axios) // 全局挂载写法二
app.mount('#app')