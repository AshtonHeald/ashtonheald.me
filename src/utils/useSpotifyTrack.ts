import { ref, onMounted, onUnmounted } from 'vue'

export type TrackType = 'none' | 'current' | 'recent' | 'error'

export interface Track {
  type: TrackType
  isPlaying: boolean
  name?: string
  artist?: string
  image?: string
  url?: string
  playedAt?: string
  error?: string
}

export function useSpotifyTrack(pollInterval = 30000) {
  const track = ref<Track | null>(null)
  const loading = ref(true)
  let interval: ReturnType<typeof setInterval> | null = null

  const fetchTrack = async () => {
    try {
      const response = await fetch('https://spotify-api.devtheash.workers.dev/')
      const data: Track = await response.json()

      track.value = data
    } catch (error) {
      console.error('Failed to fetch track:', error)
      track.value = {
        type: 'error',
        isPlaying: false,
        error: 'Failed to connect to Spotify',
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchTrack()
    interval = setInterval(fetchTrack, pollInterval)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return { track, loading, fetchTrack }
}
