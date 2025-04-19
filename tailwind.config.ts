import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        text: {
          primary: "#333333",
          secondary: "#666666",
        },
        accent: {
          success: "#4CAF50",
          error: "#F44336",
          neutral: "#BDBDBD",
          highlight: "#2196F3",
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        roboto: ['var(--font-roboto)'],
      },
      fontSize: {
        title: ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        body: ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        button: ['14px', { lineHeight: '1.4', fontWeight: '500' }],
      },
    },
  },
} satisfies Config

export default config 