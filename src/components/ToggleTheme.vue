<script setup lang="ts">
import { toggleDark } from '@/utils/theme'
</script>

<template>
  <button
    class="select-none absolute top-4 right-4"
    title="Toggle Color Scheme"
    @click="toggleDark"
  >
    <div class="icon i-ph-sun dark:i-ph-moon text-lg" />
  </button>
</template>
