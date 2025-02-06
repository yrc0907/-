
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 使用pinia
import { createPinia } from 'pinia'
// 使用router
import routes from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
const pinia = createPinia()
createApp(App).use(pinia).use(routes).use(ElementPlus).mount('#app')
