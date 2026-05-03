/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#00C8FF',
        'gold-dark': '#0099CC',
        charcoal: '#0A0F1E',
        card: '#0D1526',
        'card-hover': '#142035',
        cream: '#F5F4EF',
        muted: '#8898B0',
        border: '#1E3A5F',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        body: ['"Barlow"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'ping-slow': 'ping-slow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
