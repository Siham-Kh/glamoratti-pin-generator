import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#e11d74',
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbb6e0',
          300: '#f780c6',
          400: '#f14dab',
          500: '#e82b8d',
          600: '#e11d74',
          700: '#bc145e',
          800: '#9a114d',
          900: '#7e1040',
        },
      },
    },
  },
  plugins: [],
}

export default config
