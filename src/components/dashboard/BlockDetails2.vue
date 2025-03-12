<template>
  <v-card class="block-card mx-auto glowing-border" elevation="12" :loading="loading">
    <v-card-title class="header-gradient">
      <v-row align="center" no-gutters>
        <v-col>
          <span class="text-h5 font-weight-bold"> Last Block #{{ blockData.height }} </span>
        </v-col>
        <v-col cols="auto">
          <v-chip color="success" class="pulse-chip" size="small"> {{ blockData.txCount }} Tx </v-chip>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="pt-4">
      <div class="info-grid">
        <div class="info-item">
          <v-icon color="info" class="mb-2">mdi-clock</v-icon>
          <div class="info-title">Timestamp</div>
          <div class="info-value">{{ formatTimestamp(blockData.timestamp) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="warning" class="mb-2">mdi-key</v-icon>
          <div class="info-title">Nonce</div>
          <div class="info-value">{{ blockData.nonce }}</div>
        </div>

        <div class="info-item">
          <v-icon color="secondary" class="mb-2">mdi-lock</v-icon>
          <div class="info-title">Difficulty</div>
          <div class="info-value">{{ blockData.difficulty }}</div>
        </div>

        <div class="info-item">
          <v-icon color="primary" class="mb-2">mdi-fingerprint</v-icon>
          <div class="info-title">Hash</div>
          <div class="info-value hash-text">{{ trimHash(blockData.hash) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="success" class="mb-2">mdi-link</v-icon>
          <div class="info-title">Parent</div>
          <div class="info-value hash-text">{{ trimHash(blockData.parent) }}</div>
        </div>

        <div class="info-item full-width">
          <v-expansion-panels flat>
            <v-expansion-panel class="expansion-gradient">
              <v-expansion-panel-title>
                <v-row no-gutters align="center">
                  <v-col cols="auto">
                    <v-icon color="success">mdi-transaction</v-icon>
                  </v-col>
                  <v-col class="ml-2">
                    <span class="font-weight-bold">Transactions</span>
                    <span class="text--secondary ml-2"> ({{ blockData.txCount }}) </span>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div v-for="(tx, index) in blockData.transactions" :key="index" class="tx-item hash-text">
                  {{ trimHash(tx) }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IBlockResponse } from '../../api/dto/block.dto' // Adjust path to your types file
import {getBlocks} from "../../api/dashboard"
import type {IBlock} from "../../api/dto/block.dto"

const blockData = ref<IBlock>({
    timestamp: Date.now(),
    height: 123456,
    parent: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    data: { transactions: [] },
    ledgerHash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
    nonce: 78901234,
    difficulty: 15.5,
    dataHash: '0x901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
    hash: '0x34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    transactions: [
      '0xtx1000000000000000000000000000000000000000000000000000000000001',
      '0xtx2000000000000000000000000000000000000000000000000000000000002',
      '0xtx3000000000000000000000000000000000000000000000000000000000003',
    ],
    total: 3,
    txCount: 3,
})

const loading = ref(true)

onMounted(() => {
  getBlocks().then(block => {
    loading.value = false;
    blockData.value = block.results[0];
    console.log("THE NEW VALUE", blockData.value);

  })


});


const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString()
}

const trimHash = (hash: string): string => {
  if (hash.length <= 20) return hash
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`
}
</script>

<style scoped>
.block-card {
  background: linear-gradient(45deg, #24284f, #4b506e);
  color: #d7d7dc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.block-card:hover {
  transform: translateY(-5px);
}

.glowing-border {
  box-shadow: 0 0 20px rgba(76, 136, 184, 0.3);
}

.header-gradient {
  background: linear-gradient(90deg, #407289, #4c88b8);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-title {
  font-size: 0.9rem;
  color: #d7d7dc;
  margin-bottom: 4px;
}

.info-value {
  font-size: 1rem;
  word-wrap: break-word;
  max-width: 100%;
}

.hash-text {
  font-family: monospace;
}

.pulse-chip {
  animation: pulse 2s infinite;
}

.expansion-gradient {
  background: rgba(215, 215, 220, 0.05);
}

.tx-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(215, 215, 220, 0.1);
  word-wrap: break-word;
}

.tx-item:last-child {
  border-bottom: none;
}

.tx-item:hover {
  background: rgba(76, 136, 184, 0.1);
  transition: background 0.2s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
