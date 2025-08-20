import presetWind4 from '@unocss/preset-wind4'
import { presetIcons, presetAttributify, transformerDirectives } from 'unocss'
import { defineConfig } from 'unocss'

import svgToDataUri from 'mini-svg-data-uri'

// Helper function to parse color with opacity
function parseColorOpacity(colorStr) {
  const parts = colorStr.split('/')
  const color = parts[0]
  const opacity = parts[1] ? parseFloat(parts[1].replace(/[\[\]]/g, '')) : 1

  // Convert color name to actual color value with opacity
  // You might need to expand this based on your color needs
  const colorMap = {
    black: `rgba(23, 23, 23, ${opacity})`,
    white: `rgba(250, 250, 250, ${opacity})`,
    // Add more colors as needed
  }

  return colorMap[color] || color
}

export default defineConfig({
  theme: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
    },
  },
  shortcuts: [
    [
      /^btn-(\w+)$/,
      ([_, color]) =>
        `p2 transition-all duration-200 ease-out no-underline! hover:(text-${color} bg-${color}/10 border-ring) focus:(text-${color} outline-none bg-${color}/10 border-ring)  border border-border border-2px rounded`,
    ],
  ],
  rules: [
    // bg-dot-[color]
    [
      /^bg-dot-(.+)$/,
      ([, colorStr]) => {
        const finalColor = parseColorOpacity(colorStr)
        return {
          'background-image': `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${finalColor}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
          )}")`,
        }
      },
    ],
    [
      /^slide-enter-(\d+)$/,
      ([_, n]) => ({
        '--enter-stage': n,
      }),
    ],
  ],
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons(),
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
})
