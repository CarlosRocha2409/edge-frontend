<script setup lang="ts">
import { ref } from 'vue'
import Burns from './Burns.vue'
import Earnings from './Earnings.vue'
import BlockDetails from './BlockDetails.vue'
import Transactions from './Transactions.vue'
</script>
<template>
    <v-row>
      <v-col cols="12" md="4">
        <Burns />
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="12">
            <Transactions />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <Earnings />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <BlockDetails/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<style lang="scss">
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
