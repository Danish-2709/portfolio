/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05060a',
          900: '#0a0c14',
          800: '#10131f',
          700: '#171b2b',
          600: '#222840',
          500: '#2f3656',
        },
        aurora: {
          cyan: '#5eead4',
          blue: '#7dd3fc',
          violet: '#a78bfa',
          rose: '#fb7185',
          gold: '#fcd34d',
        },
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
    },
  },
  plugins: [],
};