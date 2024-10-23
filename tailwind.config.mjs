/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors({ colors }) {
        return {
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          background: {
            DEFAULT: 'hsl(var(--background))',
            foreground: 'hsl(var(--background-foreground))',
            border: 'hsl(var(--background-border))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
            border: 'hsl(var(--card-border))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
            border: 'hsl(var(--popover-border))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          danger: {
            DEFAULT: 'hsl(var(--danger))',
            foreground: 'hsl(var(--danger-foreground))',
          },
          info: {
            DEFAULT: 'hsl(var(--info))',
            foreground: 'hsl(var(--info-foreground))',
          },
          success: {
            DEFAULT: 'hsl(var(--success))',
            foreground: 'hsl(var(--success-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--warning))',
            foreground: 'hsl(var(--warning-foreground))',
          },
        }
      },
      fontFamily: {
        creepster: ['Creepster', 'cursive'],
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-in-out',
        'fade-in-up': 'fade-in-up 1s ease-in-out',
        'ping-large': 'ping-large 1s ease-in-out infinite',
        'move-left': 'move-left 30s linear infinite',
        'move-right': 'move-right 30s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ping-large': {
          '75%, 100%': { transform: 'scale(3)', opacity: '0' },
        },
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'move-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
