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
      <v-main class="container-mb">
        <slot></slot>
      </v-main>
    </MobileNav>
  </v-layout>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as m;

.container {
  padding: 5rem;
  display: none;
  overflow-y: scroll;
  overflow-x: hidden;

  @include m.query('md') {
    display: flex;
  }
}

.container-mb {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding:80px 20px;

  @include m.query('md') {
    display: none;
  }
}
</style>
