/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FFFFFF',
          100: '#FBF9F5',
          200: '#F4F0EA',
          300: '#EAE4D9',
          400: '#E2DCD0',
          500: '#D5CDC0',
        },
        ink: {
          charcoal: '#141413',
          slate: '#57534E',
          stone: '#8C857B',
          light: '#A8A29E',
        },
        amrita: {
          maroon: '#9E1B34',
          crimson: '#9E1B34',
          dark: '#7D1529',
          deep: '#5C0F1E',
          light: '#F8F4F2',
          border: '#E8DFDC',
          gold: '#A87622',
          goldLight: '#FAF5ED',
          goldBorder: '#E6D7BE',
        },
        emerald: {
          amrita: '#15803D',
          light: '#F0F7F2',
          border: '#D0E6D6',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'paper-sm': '0 1px 2px 0 rgba(20, 20, 19, 0.04)',
        'paper': '0 4px 16px -2px rgba(20, 20, 19, 0.05), 0 2px 4px -1px rgba(20, 20, 19, 0.03)',
        'paper-lg': '0 12px 32px -4px rgba(20, 20, 19, 0.08), 0 4px 8px -2px rgba(20, 20, 19, 0.04)',
      },
    },
  },
  plugins: [],
}
