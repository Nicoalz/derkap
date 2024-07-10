import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./guides/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-linear": "linear-gradient(to bottom, #F6D5F7 0%, #FBE9D7 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        champ: ['var(--font-champ)'],
        sans: ['var(--font-dm-sans)'],
      },
      fontSize: {
        "title": "32px",
      },
      colors: {
        "custom-primary": "#9747ff",
        "custom-white": "#f5f5f5",
        "custom-black": "#1B0A32",
        "custom-violet": "#9747FF",
        "custom-orange": "#E45B37",
        "custom-gray": "#545454",
        "grad-linear": "linear-gradient(to bottom, #F6D5F7 0%, #FBE9D7 100%)",
      },
      boxShadow: {
        'card': '5px 5px 5px #1B0A32',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      aspectRatio: {
        "image" : "9/16"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],

} satisfies Config

export default config
