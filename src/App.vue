<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/nav/NavComponent.vue'
</script>

<template>
  <Nav>
    <RouterView />
  </Nav>
</template>

<style scoped></style>
