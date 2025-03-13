<script lang="ts" setup>
import { ref, watch } from 'vue'

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>

      <v-app-bar class="mobile-nav">
        <v-app-bar-nav-icon variant="text" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-row class="nav-title">
          <img height="30px" width="30px" src="https://xe.network/logo.svg" alt="Avatar" />
          <v-toolbar-title class="ml-2">Edge Dashboard</v-toolbar-title>
        </v-row>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item prepend-icon="mdi-home-circle" title="Home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-account-circle" title="About Me" to="/about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
        <slot></slot>
</template>
<style scoped lang="scss">
@use '../../styles/mixins' as m;

.mobile-nav {
  @include m.query('md') {
    display: none;
  }

  .nav-title {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }
}
</style>
