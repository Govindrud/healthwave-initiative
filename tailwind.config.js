
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        meant: {
          50: 'hsl(var(--meant-50))',
          100: 'hsl(var(--meant-100))',
          200: 'hsl(var(--meant-200))',
          300: 'hsl(var(--meant-300))',
          400: 'hsl(var(--meant-400))',
          500: 'hsl(var(--meant-500))',
          600: 'hsl(var(--meant-600))',
          700: 'hsl(var(--meant-700))',
          800: 'hsl(var(--meant-800))',
          900: 'hsl(var(--meant-900))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'pulse': 'pulse 2s infinite cubic-bezier(0.66, 0, 0, 1)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 12px -4px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
