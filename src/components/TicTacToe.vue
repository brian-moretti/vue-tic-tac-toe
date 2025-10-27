<script setup lang="ts">
import { Players } from '@/core/enums/player.enums'
import { Roles } from '@/core/enums/role.enums'
import type { IPlayer } from '@/core/interfaces/player.interface'
import router from '@/router'
import { setupStore } from '@/stores/setupStore'
import { onMounted, ref } from 'vue'

let finalWinner: IPlayer

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const players: IPlayer[] = [
  { id: 1, role: Roles.CROSS, title: Players.PLAYER1 },
  { id: 2, role: Roles.CIRCLE, title: Players.PLAYER2 },
]
let initialPlayer: IPlayer
let turn = 1
let cells: NodeListOf<Element>
const infoText = ref('')

const setupStoreValue = setupStore()

onMounted(() => {
  if (!setupStoreValue.setup) {
    router.back()
  }
  initialPlayer = setupPlayers(setupStoreValue.setup)
  cells = document.querySelectorAll('.row')
  cells.forEach((cell, index) => (cell.id = index.toString()))
  infoText.value = `Game Start! It's your turn ${initialPlayer.title}`
})

function setupPlayers(initialSetup: string): IPlayer {
  return players.find((p) => p.role === initialSetup)!
}

function onClick(event: PointerEvent) {
  if (finalWinner) {
    return
  }
  const target = event.target as HTMLElement
  const circleCell = target.classList.contains('circle_user')
  const crossCell = target.classList.contains('cross_user')
  const cellUsed = circleCell || crossCell
  if (target.matches('.row') && !cellUsed) {
    checkGameProgress(target)
    const winner = checkWinner()
    getResult(winner)
  }
}

function checkGameProgress(target: HTMLElement) {
  turn++
  const otherPlayer = players.find((p) => p.role !== initialPlayer.role)!
  if (turn % 2 === 0) {
    target.classList.add(initialPlayer.role)
    updateTurn(initialPlayer.role)
  } else {
    target.classList.add(otherPlayer.role)
    updateTurn(otherPlayer.role)
  }
  if (turn >= 10 && !finalWinner) {
    infoText.value = "It's a tie! It's gonna be better next time"
  }
}

function updateTurn(role: Roles) {
  const playerTurn = players.find((p) => p.role === role)
  infoText.value = `Turn n. ${turn}. Let's go ${playerTurn?.title}`
}

function checkWinner() {
  let winnerPlayer: IPlayer | undefined
  winningConditions.forEach((condition) => {
    const crossWinner = condition.every((index) => cells[index].classList.contains('cross_user'))
    const circleWinner = condition.every((index) => cells[index].classList.contains('circle_user'))
    if (crossWinner) {
      winnerPlayer = players.find((p) => p.role === Roles.CROSS)
    }
    if (circleWinner) {
      winnerPlayer = players.find((p) => p.role === Roles.CIRCLE)
    }
  })
  return winnerPlayer
}

function getResult(winner: IPlayer | undefined) {
  if (winner) {
    finalWinner = winner
    infoText.value = `Congrats ${winner?.title}! You won this match`
  }
}

function onResetGame() {
  cells.forEach((cell) => {
    cell.id = ''
    if (cell.classList.contains(Roles.CIRCLE)) {
      cell.classList.remove(Roles.CIRCLE)
    }
    if (cell.classList.contains(Roles.CROSS)) {
      cell.classList.remove(Roles.CROSS)
    }
  })
  turn = 1
  infoText.value = `Game Start! It's your turn ${initialPlayer.title}`
}
</script>

<template>
  <main class="main_container" @pointerup="onClick">
    <section class="section first_row">
      <div class="row"></div>
      <div class="dividing_line"></div>
      <div class="row central"></div>
      <div class="dividing_line"></div>
      <div class="row"></div>
    </section>
    <section class="section second_row">
      <div class="row"></div>
      <div class="dividing_line"></div>
      <div class="row central"></div>
      <div class="dividing_line"></div>
      <div class="row"></div>
    </section>
    <section class="section third_row">
      <div class="row"></div>
      <div class="dividing_line"></div>
      <div class="row central"></div>
      <div class="dividing_line"></div>
      <div class="row"></div>
    </section>
    <div class="info">{{ infoText }}</div>

    <button type="button" @click="onResetGame()">Reset the game</button>
  </main>
</template>

<style scoped>
.cross_user {
  background: url('./icons/close.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.circle_user {
  background: url('./icons/circle.png');
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.main_container {
  border: 1px solid red;
  height: 70dvh;
  display: grid;
  padding: 1rem;
  width: 100%;
}

.info {
  border: 1px solid red;
  text-align: center;
}

.section {
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
}

.first_row {
  border-top: none;
  border-left: none;
  border-right: none;
}

.second_row {
  border-left: none;
  border-right: none;
}

.third_row {
  border-bottom: none;
  border-left: none;
  border-right: none;
}

.row {
  flex: 1;
}

.dividing_line {
  border: 3px solid black;
}
</style>
