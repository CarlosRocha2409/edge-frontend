<template>
  <v-card class="burn-visualization mx-auto glow-effect" max-width="600" height="100%" elevation="10">
    <v-card-title class="text-h5 font-weight-bold title-bg white--text py-4">
      <v-icon left color="white">mdi-fire</v-icon>
      Burn Statistics
    </v-card-title>

    <v-card-text class="pa-6">
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>

      <v-row class="mt-4">
        <v-col cols="6" class="text-center">
          <div class="stat-block">
            <span class="text-h7 stat-title">30 Day Burn</span>
            <div class=" font-weight-bold stat-value">
              {{ formatNumber(burnData['30d'].amount) }}
            </div>
            <div class="text-caption stat-subtitle">{{ burnData['30d'].count }} transactions</div>
          </div>
        </v-col>
        <v-col cols="6" class="text-center">
          <div class="stat-block">
            <span class="text-h7 stat-title">Total Burn</span>
            <div class=" font-weight-bold stat-value">
              {{ formatNumber(burnData.total.amount) }}
            </div>
            <div class="text-caption stat-subtitle">{{ burnData.total.count }} transactions</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart } from 'chart.js/auto'
import { getBurns } from '../../api/dashboard'

// Mock data
const burnData = ref({
  '30d': {
    amount: 500000,
    count: 150,
  },
  total: {
    amount: 2000000,
    count: 600,
  },
})

// Refs
const chartCanvas = ref<any>(null)
const chartInstance = ref<any>(null)

// Format number utility
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

// Chart creation function
const createChart = () => {
  const ctx = chartCanvas.value.getContext('2d')

  chartInstance.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [
            burnData.value['30d'].amount,
            burnData.value.total.amount - burnData.value['30d'].amount,
          ],
          backgroundColor: ['#4c88b8', '#345c84'], // light-blue, medium-blue
          borderWidth: 2,
          borderColor: '#090a14', // background
          hoverOffset: 10,
        },
        {
          data: [
            burnData.value['30d'].count,
            burnData.value.total.count - burnData.value['30d'].count,
          ],
          backgroundColor: ['#5eccba', '#407289'], // light-green, pale-blue
          borderWidth: 2,
          borderColor: '#090a14', // background
          hoverOffset: 10,
        },
      ],
      labels: ['30 Day', 'Remaining'],
    },
    options: {
      cutout: '60%',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#d7d7dc', // light-gray
            font: { size: 14 },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(36, 40, 79, 0.9)', // darker-blue
          titleFont: { size: 16 },
          bodyFont: { size: 14 },
          padding: 10,
          titleColor: '#d7d7dc', // light-gray
          bodyColor: '#d7d7dc', // light-gray
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  })
}

// Lifecycle hooks
onMounted(() => {
  getBurns().then(values=>{
    burnData.value = values;
    createChart()
  })
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as m;

/* Base styles using imported SCSS variables */
.burn-visualization {
  background: m.$background;
  border: 1px solid m.$darker-blue;
}

.title-bg {
  background: linear-gradient(135deg, m.$medium-blue 0%, m.$darker-blue 100%);
}

.glow-effect {
  transition: all 0.3s ease;
}

.glow-effect:hover {
  box-shadow: 0 0 20px rgba(m.$light-blue, 0.4);
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.stat-block {
  padding: 16px;
  border-radius: 8px;
  background: m.$darker-blue;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.stat-title {
  color: m.$medium-gray;
}

.stat-value {
  color: m.$light-blue;
  font-size: 10px;
}

.stat-subtitle {
  color: m.$dark-gray;
}

/* Base styles using the provided palette */
</style>
