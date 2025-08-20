// utils/useMarquee.ts
import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'

// Configuration constants - easily adjustable
const MARQUEE_CONFIG = {
  gapBetweenTexts: 50, // Gap between repeated text in pixels
  animationSpeedFactor: 8, // Higher = slower animation (seconds per container width)
  initialPauseSeconds: 5, // Initial pause before animation starts (seconds)
}

export function useMarquee(
  elementRef: Ref<HTMLElement | undefined>,
  containerRef: Ref<HTMLElement | undefined>,
) {
  const shouldMarquee = ref(false)
  let marqueeTimeout: number | null = null
  let originalText = ''

  const checkOverflow = async () => {
    await nextTick()
    if (!elementRef.value || !containerRef.value) return

    // Store the original text before any modifications
    originalText = elementRef.value.textContent || ''

    const elementWidth = elementRef.value.scrollWidth
    const containerWidth = containerRef.value.clientWidth
    shouldMarquee.value = elementWidth > containerWidth

    if (shouldMarquee.value) {
      startMarquee()
    } else {
      stopMarquee()
    }
  }

  const startMarquee = () => {
    if (!elementRef.value || !containerRef.value) return

    const element = elementRef.value
    const containerWidth = containerRef.value.clientWidth

    // Get original width before modifying content
    const originalWidth = element.scrollWidth

    // Create the marquee content with repeated text and gap
    element.innerHTML = `${originalText}<span style="display: inline-block; width: ${MARQUEE_CONFIG.gapBetweenTexts}px;"></span>${originalText}`

    const scrollDistance = originalWidth + MARQUEE_CONFIG.gapBetweenTexts

    // Reset initial position
    element.style.transition = 'none'
    element.style.transform = 'translateX(0)'

    const runMarqueeLoop = () => {
      // Initial pause
      marqueeTimeout = window.setTimeout(() => {
        const animationDuration =
          (scrollDistance / containerWidth) * MARQUEE_CONFIG.animationSpeedFactor
        element.style.transition = `transform ${animationDuration}s linear`
        element.style.transform = `translateX(-${scrollDistance}px)`

        // When animation completes, reset and continue
        marqueeTimeout = window.setTimeout(
          () => {
            element.style.transition = 'none'
            element.style.transform = 'translateX(0)'

            // Immediately restart the loop (no pause)
            if (shouldMarquee.value) {
              runMarqueeLoop()
            }
          },
          animationDuration * 1000, // Convert to milliseconds
        )
      }, MARQUEE_CONFIG.initialPauseSeconds * 1000) // Convert to milliseconds
    }

    runMarqueeLoop()
  }

  const stopMarquee = () => {
    if (marqueeTimeout) {
      clearTimeout(marqueeTimeout)
      marqueeTimeout = null
    }

    if (elementRef.value) {
      elementRef.value.style.transition = 'none'
      elementRef.value.style.transform = 'translateX(0)'
      elementRef.value.textContent = originalText
    }
  }

  const restart = () => {
    stopMarquee()
    checkOverflow()
  }

  onMounted(checkOverflow)
  onUnmounted(stopMarquee)

  return {
    shouldMarquee,
    checkOverflow,
    restart,
    stopMarquee,
  }
}
