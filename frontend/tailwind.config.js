/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          mint: '#61D3A9',
          DEFAULT: '#61D3A9',
        },
        mint: {
          50: '#E9FBF6',
          100: '#E9F9F1',
          200: '#A9EFE0',
          300: '#7DE7D1',
          400: '#52DFC2',
          500: '#34D3B4',
          600: '#61D3A9',
          700: '#1F7F6C',
          800: '#155548',
          900: '#0A2A24',
        },
        text: {
          900: '#111111',
          700: '#4B5563',
          500: '#6B7280',
          primary: '#111111',
          secondary: '#4B5563',
          tertiary: '#6B7280',
        },
        line: {
          200: '#E5E7EB',
        },
        border: {
          soft: '#E6F3EE',
          DEFAULT: '#E5E7EB',
        },
        accent: {
          emerald: '#34D399',
        },
        danger: '#FF6B6B',
        badge: {
          gray: '#F2F4F7',
        },
        white: '#FFFFFF',
        background: '#F9FAF9',
      },
      borderRadius: {
        card: '20px',
        'card-sm': '16px',
        chip: '16px',
        tab: '12px',
        input: '14px',
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(0, 0, 0, 0.06)',
        card: '0 4px 16px rgba(0, 0, 0, 0.06)',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}

