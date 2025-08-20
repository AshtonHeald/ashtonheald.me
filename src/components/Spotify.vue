<script setup lang="ts">
import { computed } from 'vue'
import { useSpotifyTrack } from '../utils/useSpotifyTrack'
import SpotifyTrackCard from './SpotifyCard.vue'

const { track, loading } = useSpotifyTrack()

const widgetType = computed(() => {
  if (loading.value) return 'loading'
  if (!track.value || track.value.type === 'none') return 'none'
  if (track.value.type === 'current' && track.value.isPlaying) return 'current'
  if (track.value.type === 'recent') return 'recent'
  if (track.value.error) return 'error'
  return 'none'
})
</script>

<template>
  <div class="mt-auto">
    <div v-if="widgetType === 'loading'" class="flex items-center gap-2 text-gray-600 text-sm">
      <div class="animate-pulse">♪</div>
      <span>Loading...</span>
    </div>

    <div v-else-if="widgetType === 'none'" class="flex items-center gap-2 text-gray-500 text-sm">
      <span>♪</span>
      <span>No recent activity</span>
    </div>

    <SpotifyTrackCard v-else-if="widgetType === 'current'" :track="track!" variant="current" />

    <SpotifyTrackCard v-else-if="widgetType === 'recent'" :track="track!" variant="recent" />

    <template v-else-if="widgetType === 'error'" />
  </div>
</template>
