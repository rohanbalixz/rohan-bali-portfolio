/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBFBF9',
        surface: '#FBFBF9',
        ink: '#1F1F1D',
        muted: '#4F4D48',
        subtle: '#6F6C65',
        rule: '#DAD8D1',
        'soft-rule': '#E9E7E0',
        accent: '#1A5FB4',
        'accent-hover': '#0E4589',
        highlight: '#B3261E',
        secondary: '#5C5A53',
        success: '#3A5A40',
        'code-bg': '#F3F2EC',
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'Lato', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-lato)', 'Lato', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['13px', '1.5'],
        sm: ['15px', '1.55'],
        base: ['16.5px', '1.6'],
        lg: ['18px', '1.5'],
        xl: ['21px', '1.4'],
        '2xl': ['24px', '1.35'],
        '3xl': ['32px', '1.25'],
        '4xl': ['36px', '1.2'],
        '5xl': ['44px', '1.15'],
      },
      lineHeight: {
        relaxed: '1.6',
        loose: '1.65',
      },
      maxWidth: {
        prose: '72ch',
        narrow: '55ch',
        wide: '76ch',
      },
      fontVariantNumeric: {
        'tabular-nums': 'tabular-nums',
      },
    },
  },
  plugins: [],
};
