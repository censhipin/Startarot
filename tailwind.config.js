/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: '#0F1923',
          card: '#111827',
        },
        gold: {
          DEFAULT: '#C9A96E',
          dark: '#8B6914',
        },
        text: {
          primary: '#F1F0FB',
          secondary: '#94A3B8',
          muted: '#64748B',
          dim: '#475569',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover: 'rgba(201,169,110,0.15)',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
