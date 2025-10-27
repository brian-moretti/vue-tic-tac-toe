import ChooseSetup from '@/components/ChooseSetup.vue'
import TicTacToe from '@/components/TicTacToe.vue'
import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      { path: '/choose-setup', component: ChooseSetup, name: 'Choose-Setup' },
      { path: '/tic-tac-toe', component: TicTacToe, name: 'Tic-Tac-Toe' },
    ],
    redirect: '/choose-setup',
  },
]
const router: Router = createRouter({ history: createWebHistory(), routes })
export default router
