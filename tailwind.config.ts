import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F4EFEA',
          300: '#E8DEC9',
          400: '#D4AF37',
          500: '#B48226',
          600: '#8E641A',
          700: '#684811',
          800: '#442E09',
          900: '#231703',
          gold: '#D4AF37',
          bronze: '#B48226',
          cream: '#FAF8F5',
          alabaster: '#F4EFEA',
          slate: '#0F172A',
          slateMuted: '#64748B',
          cardLight: '#FFFFFF',
          borderLight: '#E2E8F0',
          dark: '#0F172A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
        'luxury-hover': '0 25px 50px -12px rgba(180, 130, 38, 0.25), 0 10px 15px -3px rgba(15, 23, 42, 0.08)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-slow': 'zoomSlow 25s infinite alternate ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
