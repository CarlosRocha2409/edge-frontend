<template>
  <v-card>
    <v-card-title>
      Stakes Overview
    </v-card-title>
    <v-card-subtitle>
      Staked Amount: {{ stakes.stakedAmount }} | Count: {{ stakes.count }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { defineProps } from 'vue';

export default {
  props: {
    stakes: {
      type: Object,
      required: true
    }
  }
};
</script>

