/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D18',
          900: '#0F172A',
          850: '#131F37',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        shield: {
          blue: '#1E3A8A',
          cyan: '#0284C7',
          teal: '#0D9488',
        },
        risk: {
          low: '#10B981',
          moderate: '#F59E0B',
          elevated: '#EF4444',
          critical: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(203, 213, 225, 0.9)',
        'glow-low': '0 0 15px rgba(16, 185, 129, 0.2)',
        'glow-mod': '0 0 15px rgba(245, 158, 11, 0.2)',
        'glow-high': '0 0 15px rgba(239, 68, 68, 0.25)',
      }
    },
  },
  plugins: [],
}
