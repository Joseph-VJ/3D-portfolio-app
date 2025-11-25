/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'card-in': 'card-stack-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'ping-once': 'ping 0.4s cubic-bezier(0, 0, 0.2, 1)',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1)',
        'pulse-beat': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '1500': '1500px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
        'visible': 'visible',
      },
    },
  },
  plugins: [],
}