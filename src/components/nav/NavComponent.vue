<script setup lang="ts">
import SideNav from './SideNav.vue'
import MobileNav from './MobileNav.vue'
</script>

<template>
  <v-layout style="height: 100vh; width: 100%">
    <SideNav>
      <v-main class="container" style="height: 100vh; width: 100%">
        <slot></slot>
      </v-main>
    </SideNav>

    <MobileNav>
      <v-main style="height: 100vh; width: 100%">
        <slot></slot>
      </v-main>
    </MobileNav>
  </v-layout>
</template>

<style scoped lang="scss">
.container {
  padding: 5rem;
}
</style>
