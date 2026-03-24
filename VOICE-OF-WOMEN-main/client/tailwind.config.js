/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF6B6B', // Warm coral
          DEFAULT: '#C2185B', // Deep rose
          dark: '#8E0E4D', 
        },
        secondary: {
          light: '#FAF0E6', // Champagne
          DEFAULT: '#F4C430', // Soft gold
          dark: '#D4A820',
        },
        accent: {
          DEFAULT: '#00897B', // Teal (Health/wellness)
        },
        dark: {
          DEFAULT: '#1A0A2E', // Deep plum background
          card: '#2A1A4A',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/placeholder-texture.svg')",
      }
    },
  },
  plugins: [],
}
