import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#303082',
        accent: '#4E6EFF',
        background: '#F9FAFB',
        textMain: '#111827',
        textSoft: '#6B7280',
        highlight: '#FACC15',
        borderLight: '#E5E7EB',
        error: '#EF4444',
        focusOutline: '#4E6EFF',
        linkHover: '#3B54D6',

        // 🌑 Modo oscuro
        darkBackground: '#1F2937', // gray-800
        darkTextMain: '#F9FAFB', // texto claro sobre fondo oscuro
        darkTextSoft: '#D1D5DB', // gris claro
        darkBorderLight: '#374151', // gray-700
        darkHighlight: '#FACC15', // se puede mantener
      },
      boxShadow: {
        customShadow: '0 4px 6px rgba(0,0,0,0.1)',
        focusShadow: '0 0 0 3px rgba(78,110,255,0.5)',
      },
      screens: {
        tiny: '320px',
        'mobile-sm': '375px',
        mobile: '425px',
        tablet: '640px',
        'tablet-lg': '768px',
        'laptop-sm': '1024px',
        laptop: '1280px',
        desktop: '1440px',
        'desktop-lg': '1536px',
        ultra: '2560px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    heroui(),
    require('tailwind-scrollbar-hide'),
  ],
};
