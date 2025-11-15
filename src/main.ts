import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import TicTacToe from './TicTacToe.vue'
import CellaComponent from './components/CellaComponent.vue'
import TabelloneComponent from './components/TabelloneComponent.vue'
import router from './router'

const app = createApp(TicTacToe)
app.component('TabelloneComponent', TabelloneComponent)
app.component('CellaComponent', CellaComponent)
app.use(router).use(createPinia())
app.mount('#app')
