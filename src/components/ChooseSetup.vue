<script setup lang="ts">
import { Roles } from '@/core/enums/role.enums'
import router from '@/router'
import { setupStore } from '@/stores/setupStore'
import { ref } from 'vue'

const setupStoreValue = setupStore()
const circleSetup = Roles.CIRCLE
const crossSetup = Roles.CROSS
//const setupSelected = ref('')
const showSetup = ref(false)
const setup = ref('')

function onChangeSelection() {
  switch (setupStoreValue.setup) {
    case Roles.CIRCLE:
      showSetup.value = true
      setup.value = 'Cirle player'
      break
    case Roles.CROSS:
      showSetup.value = true
      setup.value = 'Cross player'
      break
    default:
      setup.value = ''
      break
  }
}

function goToGame() {
  router.push({ name: 'Tic-Tac-Toe' })
}
</script>

<template>
  <div>
    <select v-model="setupStoreValue.setup" v-on:change="onChangeSelection()">
      <option disabled selected value>Please select who's going to start!</option>
      <option :value="circleSetup">Circle Player</option>
      <option :value="crossSetup">Cross Player</option>
    </select>

    <p v-if="showSetup">You choose to be the {{ setup }}</p>
    <button v-if="showSetup" type="submit" v-on:click="goToGame()">Start the game</button>
  </div>
</template>
