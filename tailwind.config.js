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
        secondary: '#EAF2FA',
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
        darkSecondary: '#2D365D',
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
        fadeInOpacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rFadeIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        rFadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        lFadeIn: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        lFadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in-up-lg': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        bounceScale: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.15)' },
          '60%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        blob: 'blob 8s infinite',
        bounceScale: 'bounceScale 300ms ease-in-out',
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInOpacity: 'fadeInOpacity 1s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'fade-in-up-lg': 'fade-in-up 0.6s ease-out both',
        lFadeIn: 'lFadeIn 1s ease-out forwards',
        lFadeOut: 'lFadeOut 1s ease-out forwards',
        rFadeIn: 'rFadeIn 1s ease-out forwards',
        rFadeOut: 'rFadeOut 1s ease-out forwards',
        typing: 'typing 3s steps(40, end) 1',
        typingFast: 'typing 1.5s steps(40, end) 1',
      },
    },
  },
  plugins: [
    heroui(),
    require('tailwind-scrollbar-hide'),
  ],
};
