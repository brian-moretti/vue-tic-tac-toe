<script lang="ts" setup>
defineProps({ cell: Number, cellClass: String })

/* function onClick(event: PointerEvent) {
  const target = event.target as HTMLElement
  const circleCell = target.classList.contains('circle_user')
  const crossCell = target.classList.contains('cross_user')
  const cellUsed = circleCell || crossCell
  if (target.matches('[class^=border]') && !cellUsed) {
    checkGameProgress(target)
    const winner = checkWinner()
    getResult(winner)
  }
} */
</script>

<template>
  <div v-bind:class="cellClass"></div>
</template>

<style scoped>
@import '../assets/main.css';

.border-br,
.border-blr,
.border-bl,
.border-trb,
.border-tlb,
.border-all {
  border-bottom: 3px solid black;
}

.border-tr,
.border-tlr,
.border-tl,
.border-trb,
.border-tlb,
.border-all {
  border-top: 3px solid black;
}

.border-br,
.border-tr,
.border-blr,
.border-tlr,
.border-trb,
.border-all {
  border-right: 3px solid black;
}

.border-bl,
.border-tl,
.border-blr,
.border-tlb,
.border-tlr,
.border-all {
  border-left: 3px solid black;
}

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
</style>
