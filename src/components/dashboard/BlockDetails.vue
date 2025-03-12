<template>
  <v-card class="block-card mx-auto glowing-border" elevation="12" :loading="loading">
    <v-card-title class="header-gradient">
      <v-row align="center" no-gutters>
        <v-col>
          <span class="text-h5 font-weight-bold"> Last Block #{{ lastBlock.block.height }} </span>
        </v-col>
        <v-col cols="auto">
          <v-chip color="success" class="pulse-chip" size="small">
            {{ blockResponse.results.length }} Tx
          </v-chip>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="pt-4">
      <div class="info-grid">
        <div class="info-item">
          <v-icon color="info" class="mb-2">mdi-clock</v-icon>
          <div class="info-title">Timestamp</div>
          <div class="info-value">{{ formatTimestamp(lastBlock.timestamp) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="warning" class="mb-2">mdi-key</v-icon>
          <div class="info-title">Nonce</div>
          <div class="info-value">{{ lastBlock.nonce }}</div>
        </div>

        <div class="info-item">
          <v-icon color="secondary" class="mb-2">mdi-account</v-icon>
          <div class="info-title">Sender</div>
          <div class="info-value hash-text">{{ trimHash(lastBlock.sender) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="secondary" class="mb-2">mdi-account-arrow-right</v-icon>
          <div class="info-title">Recipient</div>
          <div class="info-value hash-text">{{ trimHash(lastBlock.recipient) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="primary" class="mb-2">mdi-fingerprint</v-icon>
          <div class="info-title">Hash</div>
          <div class="info-value hash-text">{{ trimHash(lastBlock.hash) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="success" class="mb-2">mdi-link</v-icon>
          <div class="info-title">Parent Hash</div>
          <div class="info-value hash-text">{{ trimHash(lastBlock.block.hash) }}</div>
        </div>

        <div class="info-item">
          <v-icon color="info" class="mb-2">mdi-cash</v-icon>
          <div class="info-title">Amount</div>
          <div class="info-value">{{ lastBlock.amount }}</div>
        </div>

        <div class="info-item">
          <v-icon color="purple" class="mb-2">mdi-shield-check</v-icon>
          <div class="info-title">Confirmations</div>
          <div class="info-value">{{ lastBlock.confirmations }}</div>
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
                    <span class="font-weight-bold">Transaction Data</span>
                    <span class="text--secondary ml-2"> ({{ blockResponse.results.length }}) </span>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="tx-data">
                  <div class="tx-item" v-if="lastBlock.data.memo">
                    <span class="tx-label">Memo:</span>
                    <span class="tx-value">{{ lastBlock.data.memo }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.action">
                    <span class="tx-label">Action:</span>
                    <span class="tx-value">{{ lastBlock.data.action }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.device">
                    <span class="tx-label">Device:</span>
                    <span class="tx-value">{{ trimHash(lastBlock.data.device) }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.signature">
                    <span class="tx-label">Signature:</span>
                    <span class="tx-value hash-text">{{ trimHash(lastBlock.data.signature) }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.stake">
                    <span class="tx-label">Stake:</span>
                    <span class="tx-value">{{ trimHash(lastBlock.data.stake) }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.destination">
                    <span class="tx-label">Destination:</span>
                    <span class="tx-value hash-text">{{
                      trimHash(lastBlock.data.destination)
                    }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.ref">
                    <span class="tx-label">Ref:</span>
                    <span class="tx-value hash-text">{{ trimHash(lastBlock.data.ref) }}</span>
                  </div>
                  <div class="tx-item" v-if="lastBlock.data.token">
                    <span class="tx-label">Token:</span>
                    <span class="tx-value">{{ lastBlock.data.token }}</span>
                  </div>
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
import { ref, onMounted, computed } from 'vue'
import type { IBlockResponse } from '../../api/dto/block.dto' // Adjust path to your types file
import { getBlocks } from '../../api/dashboard'
import type { IBlock } from '../../api/dto/block.dto'

// Mock data for the last block
const blockResponse = ref<IBlockResponse>({
  results: [
    {
      timestamp: Date.now(),
      sender: '0xabcdef1234567890abcdef1234567890abcdef12',
      recipient: '0x1234567890abcdef1234567890abcdef12345678',
      amount: 100.5,
      data: {
        memo: 'Payment for services',
        action: 'transfer',
        device: 'mobile',
        signature: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
        stake: '10.5',
        destination: '0x567890abcdef1234567890abcdef1234567890ab',
        ref: '0x901234567890abcdef1234567890abcdef12345678',
        token: 'ETH',
      },
      nonce: 78901234,
      signature: '0x34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
      hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
      block: {
        height: 123456,
        hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      },
      confirmations: 6,
    },
  ],
  metadata: {
    count: 1,
    limit: 10,
    page: 1,
    skip: 0,
    totalCount: 1000,
  },
})
const loading = ref(true)

onMounted(() => {
  getBlocks().then((block) => {
    loading.value = false
    console.log('BLOCK RESULTS', block)
    blockResponse.value = block
  })
})

const lastBlock = computed(() => blockResponse.value?.results[0])

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

.tx-data {
  padding: 8px 0;
}

.tx-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
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

.tx-label {
  font-weight: bold;
  margin-right: 8px;
  flex-shrink: 0;
}

.tx-value {
  word-wrap: break-word;
  text-align: right;
  flex: 1;
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
