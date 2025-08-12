/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(55 65 81)',
            p: {
              fontSize: '1.125rem',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '800',
              lineHeight: '2.5rem',
              marginBottom: '2rem',
              color: 'rgb(17 24 39)',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '2.25rem',
              marginBottom: '1.5rem',
              marginTop: '2rem',
              color: 'rgb(17 24 39)',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '2rem',
              marginBottom: '1rem',
              marginTop: '1.5rem',
              color: 'rgb(17 24 39)',
            },
            code: {
              color: 'rgb(239 68 68)',
              backgroundColor: 'rgb(243 244 246)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(17 24 39)',
              color: 'rgb(229 231 235)',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
            },
            'pre code': {
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            },
            blockquote: {
              borderLeft: '4px solid rgb(59 130 246)',
              backgroundColor: 'rgb(249 250 251)',
              padding: '1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
            },
            'blockquote p': {
              fontSize: '1.25rem',
              fontStyle: 'italic',
              marginBottom: '0',
              color: 'rgb(31 41 55)',
            },
            ul: {
              marginBottom: '1.5rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              marginBottom: '1.5rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
              fontSize: '1.125rem',
              lineHeight: '1.75',
            },
            a: {
              color: 'rgb(59 130 246)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a:hover': {
              color: 'rgb(37 99 235)',
            },
            img: {
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
            },
            table: {
              marginBottom: '1.5rem',
              borderCollapse: 'collapse',
              width: '100%',
            },
            th: {
              backgroundColor: 'rgb(249 250 251)',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'rgb(55 65 81)',
              borderBottom: '1px solid rgb(229 231 235)',
            },
            td: {
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgb(229 231 235)',
              fontSize: '0.875rem',
              color: 'rgb(55 65 81)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
