<script setup lang="ts">
import Dashboard from "../components/dashboard/Dashboard.vue"
</script>
<template>
  <main>
    <Dashboard />
    this is a dashboard
  </main>
</template>

<style lang="scss">
@use '../styles/variables' as v;

main {
  background-color: v.$darker-blue;
}
</style>
