<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatTimeAgo } from '../utils/time'
import { useMarquee } from '../utils/useMarquee'
import type { Track } from '../utils/useSpotifyTrack'

interface Props {
  track: Track
  variant: 'current' | 'recent'
}

const props = defineProps<Props>()

// Title marquee
const titleRef = ref<HTMLElement>()
const titleContainerRef = ref<HTMLElement>()
const titleMarquee = useMarquee(titleRef, titleContainerRef)

// Artist marquee
const artistRef = ref<HTMLElement>()
const artistContainerRef = ref<HTMLElement>()
const artistMarquee = useMarquee(artistRef, artistContainerRef)

// Watch for track changes and restart marquees
watch(
  () => props.track.name,
  () => {
    titleMarquee.restart()
  },
)

watch(
  () => props.track.artist,
  () => {
    artistMarquee.restart()
  },
)
</script>

<template>
  <div>
    <!-- Header -->
    <div
      v-if="props.variant === 'current'"
      class="flex items-center justify-center gap-1.5 mb-1 ml-1"
    >
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span class="text-xs font-medium text-primary">Now Listening To</span>
    </div>
    <div v-else class="flex items-center justify-center gap-1.5 mb-1">
      <div class="w-2 h-2 bg-muted-foreground rounded-full"></div>
      <span class="text-xs font-medium text-primary">Last Listened To</span>
      <span v-if="props.track.playedAt" class="text-accent-foreground text-xs">
        {{ formatTimeAgo(props.track.playedAt) }}
      </span>
    </div>

    <!-- Card -->
    <div class="flex items-center gap-3 p2 rounded border border-border border-2px max-w-[274px]">
      <img
        v-if="props.track.image"
        :src="props.track.image"
        :alt="props.track.name + ' album cover'"
        class="w-10 h-10 rounded object-cover"
        loading="lazy"
      />
      <div class="flex-1 overflow-hidden space-y-0.5">
        <!-- Title with marquee -->
        <div ref="titleContainerRef" class="overflow-hidden whitespace-nowrap text-sm">
          <a
            v-if="props.track.url"
            ref="titleRef"
            :href="props.track.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium hover:underline inline-block focus:outline-none focus:underline"
            :aria-label="props.track.url"
            title="Open in Spotify"
          >
            {{ props.track.name }}
          </a>
          <span v-else ref="titleRef" class="text-sm font-medium inline-block">
            {{ props.track.name }}
          </span>
        </div>

        <!-- Artist with marquee -->
        <div ref="artistContainerRef" class="overflow-hidden whitespace-nowrap op80 text-xs">
          <div ref="artistRef" class="text-xs inline-block">
            {{ props.track.artist }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
