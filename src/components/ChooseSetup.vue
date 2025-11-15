<script setup lang="ts">
import { Roles } from '@/core/enums/role.enums'
import router from '@/router'
import { setupStore } from '@/stores/setupStore'
import { onMounted, ref } from 'vue'

const setupStoreValue = setupStore()
const circleSetup = Roles.CIRCLE
const crossSetup = Roles.CROSS
const showSetup = ref(false)
const setup = ref('')

onMounted(() => {
  if (setupStoreValue.setup) {
    showSetup.value = true
    setup.value = setupStoreValue.setup === Roles.CIRCLE ? 'Cirle player' : 'Cross player'
  }
})

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
  <div class="container">
    <select class="selection" v-model="setupStoreValue.setup" v-on:change="onChangeSelection()">
      <option disabled selected value>Please select who's going to start!</option>
      <option :value="circleSetup">Circle Player</option>
      <option :value="crossSetup">Cross Player</option>
    </select>

    <p v-if="showSetup" class="info">You choose to be the {{ setup }}</p>
    <button v-if="showSetup" type="submit" class="button" v-on:click="goToGame()">
      Start the game
    </button>
  </div>
</template>

<style scoped>
@import '../assets/main.css';

.container {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.selection {
  font-size: 1rem;
  padding: 5px 3px;
  border-radius: 3px;
}

.info {
  font-size: 1.125rem;
  color: #ffb74d;
  font-weight: bold;
}
</style>
