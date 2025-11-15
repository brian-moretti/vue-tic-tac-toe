import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import TicTacToe from './TicTacToe.vue'
import router from './router'

const app = createApp(TicTacToe)
app.use(router).use(createPinia())
app.mount('#app')
