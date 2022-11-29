import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import login from './assets/login.css'

createApp(App).use(router).use(login).mount('#app')
