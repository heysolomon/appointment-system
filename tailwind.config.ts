/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        pakistan_green: {
          DEFAULT: "#064906",
          100: "#010e01",
          200: "#021c02",
          300: "#032a03",
          400: "#053905",
          500: "#064906",
          600: "#0c970c",
          700: "#13e713",
          800: "#5ff25f",
          900: "#aff8af",
        },
        green_yellow: {
          DEFAULT: "#BAFF6B",
          100: "#274800",
          200: "#4d9100",
          300: "#74d900",
          400: "#98ff23",
          500: "#baff6b",
          600: "#c8ff89",
          700: "#d6ffa6",
          800: "#e3ffc4",
          900: "#f1ffe1",
        },
        dark_green: {
          DEFAULT: "#1C3017",
          100: "#060a05",
          200: "#0b1309",
          300: "#111d0e",
          400: "#172713",
          500: "#1c3017",
          600: "#3f6b34",
          700: "#62a750",
          800: "#95c689",
          900: "#cae2c4",
        },
        tea_green: {
          DEFAULT: "#CDFFCC",
          100: "#025c00",
          200: "#03b800",
          300: "#18ff14",
          400: "#73ff70",
          500: "#cdffcc",
          600: "#d7ffd6",
          700: "#e1ffe0",
          800: "#ebffeb",
          900: "#f5fff5",
        },
        forest_green: {
          DEFAULT: "#1B891B",
          100: "#051b05",
          200: "#0b370b",
          300: "#105210",
          400: "#166d16",
          500: "#1b891b",
          600: "#26c226",
          700: "#51dd51",
          800: "#8be88b",
          900: "#c5f4c5",
        },
        slate_green: {
          DEFAULT: "#012A01",
          100: "#000800",
          200: "#001000",
          300: "#011801",
          400: "#012001",
          500: "#012a01",
          600: "#038303",
          700: "#06df06",
          800: "#48fa48",
          900: "#a4fda4",
        },
      },
      backgroundImage: {
        img: ''
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
