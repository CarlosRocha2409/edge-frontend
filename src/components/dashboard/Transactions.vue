<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <h4>Transactions</h4>
    </v-card-title>

    <v-card-text>
      We have {{totalTransactions}} in total. 
    </v-card-text>

    <div class="px-4">
      <v-switch
        :label="`${showDetails ? 'Hide' : 'Show'} Transactions`"
        v-model="showDetails"
        density="compact"
        inset
      ></v-switch>
    </div>

    <v-divider></v-divider>
    <v-expand-transition>
      <div v-if="showDetails">
        <v-list :lines="false" density="compact" class="py-0">
          <v-list-item
            v-for="(transaction, index) in transactions"
            :key="transaction.hash"
            class="transaction-item"
          >
            <template v-slot:default>
              <div class="d-flex justify-space-between align-center py-2">
                <div>
                  <div class="d-flex align-center">
                    <v-icon
                      :color="transaction.amount > 0 ? 'green' : 'red'"
                      size="16"
                      class="mr-2"
                    >
                      {{ transaction.amount > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                    </v-icon>
                    <span class="font-weight-medium">
                      {{ transaction.amount }} XE 
                    </span>
                  </div>
                  <div class="text-caption text-grey">
                    {{ formatTimestamp(transaction.timestamp) }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-caption">
                    To: {{ truncateAddress(transaction.recipient) }}
                  </div>
                  <div class="text-caption text-grey">
                    Memo: {{ transaction.data.memo }}
                  </div>
                </div>
              </div>
              <v-divider v-if="index < transactions.length - 1" class="my-1"></v-divider>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTransactions } from '../../api/dashboard'
import type { ITransaction } from '@/api/dto/transaction.dto';

const showDetails = ref(false)

const transactions = ref<ITransaction[]>([])
const totalTransactions = ref<number>(0)

onMounted(() => {
  getTransactions().then((value) => {
    transactions.value = value.results;
    totalTransactions.value = value.metadata.totalCount;

  })
})

//const transactions = ref([
//  {
//    timestamp: Date.now() - 3600000, // 1 hour ago
//    sender: '0x1234567890abcdef1234567890abcdef12345678',
//    recipient: '0xabcdef1234567890abcdef1234567890abcdef12',
//    amount: 5.25,
//    data: {
//      memo: 'Payment for dessert',
//      ref: 'TX123456'
//    },
//    nonce: 1,
//    signature: '0xabcdef...',
//    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
//    block: {
//      height: 1234567,
//      hash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234'
//    },
//    confirmations: 12
//  },
//  {
//    timestamp: Date.now() - 7200000, // 2 hours ago
//    sender: '0xabcdef1234567890abcdef1234567890abcdef12',
//    recipient: '0x1234567890abcdef1234567890abcdef12345678',
//    amount: -2.75,
//    data: {
//      memo: 'Refund for melted yogurt',
//      ref: 'TX123457'
//    },
//    nonce: 2,
//    signature: '0x123456...',
//    hash: '0xabcdef78901234567890abcdef1234567890abcdef1234567890abcdef123456',
//    block: {
//      height: 1234566,
//      hash: '0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12'
//    },
//    confirmations: 13
//  }
//])

// Helper functions for formatting
const formatTimestamp = (timestamp:number) => {
  return new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

const truncateAddress = (address:string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}


</script>

<style scoped>
.transaction-item {
  min-height: 60px;
}
</style>
