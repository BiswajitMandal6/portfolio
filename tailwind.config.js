/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trust and Healthcare Palette
        clinic: {
          navy: {
            50: '#f0f4f9',
            100: '#dce5f1',
            500: '#1d4ed8', // Trustworthy Primary Blue
            800: '#1e3a8a', // Deep Professional Navy
            950: '#0f172a', // Clean Dark Background
          },
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            500: '#0d9488', // Hygienic Soft Teal
            600: '#0f766e',
            700: '#115e59',
          },
          accent: {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#2563eb', // Interactive Accent Blue
            600: '#1d4ed8',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
