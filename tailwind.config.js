/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        blush: {
          50: "#FEF9F7",
          100: "#FBF0EC",
          200: "#F6DFD8",
          300: "#EFC7BC",
          400: "#E3A190",
          500: "#D17E68",
        },
        rose: {
          50: "#FBF1F3",
          100: "#F4DEE3",
          200: "#E3AEBB",
          300: "#C97188",
          400: "#A63E5A",
          500: "#8A2E48",
          600: "#6E2038",
          700: "#4F1628",
        },
        gold: {
          50: "#FBF7EC",
          100: "#F3E7C8",
          200: "#E5CD8F",
          300: "#D4AF5E",
          400: "#C29A3F",
          500: "#A47F2E",
        },
        plum: {
          50: "#F5F1F3",
          100: "#E4D8DF",
          400: "#6B5561",
          500: "#4A3843",
          600: "#372834",
          700: "#2A1D26",
          800: "#1E1419",
        },
        cream: "#FDF8F4",
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(74, 56, 67, 0.15)",
        card: "0 8px 32px -12px rgba(74, 56, 67, 0.22)",
      },
      backgroundImage: {
        "rose-gradient": "linear-gradient(135deg, #8A2E48 0%, #A63E5A 55%, #C29A3F 100%)",
      },
    },
  },
  plugins: [],
};
