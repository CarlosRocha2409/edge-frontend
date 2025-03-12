<template>
  <v-container>
    <v-row justify="center">
      <!-- All Time Earnings Card -->
      <v-col cols="12" md="6">
        <v-card class="earnings-card pa-6" elevation="10" color="surface-bright" dark>
          <v-row align="center">
            <v-col cols="4">
              <v-avatar size="80" color="primary" class="elevation-5">
                <v-icon size="50" color="surface-bright">mdi-bank</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <v-slide-y-transition appear>
                <div>
                  <div class="text-h6 font-weight-light" color="primary">All Time Earnings</div>
                  <div class="text-h7 font-weight-bold">
                    {{ formatNumber(earnings.allTime.amount) }} XE
                  </div>
                  <div class="text-subtitle-1 mt-1" color="primary-darken-1">
                    {{ earnings.allTime.num }} Transactions
                  </div>
                </div>
              </v-slide-y-transition>
            </v-col>
          </v-row>
          <v-progress-linear value="100" color="surface-light" height="4" class="mt-4" rounded></v-progress-linear>
        </v-card>
      </v-col>

      <!-- 24h Earnings Card -->
      <v-col cols="12" md="6">
        <v-card class="earnings-card pa-6" elevation="10" color="secondary" dark>
          <v-row align="center">
            <v-col cols="4">
              <v-avatar size="80" color="primary" class="elevation-5">
                <v-icon size="50" color="secondary">mdi-clock</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <v-slide-y-transition appear>
                <div>
                  <div class="text-h6 font-weight-light" color="primary">Last 24 Hours</div>
                  <div class="text-h7 font-weight-bold">
                    {{ formatNumber(earnings['24h'].amount) }} XE
                  </div>
                  <div class="text-subtitle-1 mt-1" color="primary-darken-1">
                    {{ earnings['24h'].num }} Transactions
                  </div>
                </div>
              </v-slide-y-transition>
            </v-col>
          </v-row>
          <v-progress-linear value="100" color="surface-light" height="4" class="mt-4" rounded></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getEarnings } from '../../api/dashboard'

// Define the mock data
const earnings = ref({
  allTime: {
    num: 1500,
    amount: 24500.5,
  },
  '24h': {
    num: 45,
    amount: 1250.75,
  },
})

onMounted(() => {
  getEarnings().then(earn => {
    earnings.value = earn
  })


});

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<style scoped>
.earnings-card {
  transition: transform 0.3s ease-in-out;
}

.earnings-card:hover {
  transform: translateY(-5px);
}

.v-avatar {
  transition: transform 0.3s ease-in-out;
}

.v-avatar:hover {
  transform: scale(1.1);
}

.v-container {
  background: var(--v-theme-background);
  padding: 0;
}
</style>
