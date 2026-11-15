/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#517B65',
          dark: '#385848',
          deep: '#23392e',
          light: '#6c9680',
          subtle: '#edf3f0',
          muted: '#8da899',
        },
        beige: {
          DEFAULT: '#E7E0D0',
          light: '#f6f3ec',
          soft: '#fbf9f6',
          warm: '#dfd7c3',
          dark: '#c4b9a0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'Lato', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(81, 123, 101, 0.1)',
        'elevated': '0 20px 40px -15px rgba(35, 57, 46, 0.15)',
      }
    },
  },
  plugins: [],
}

