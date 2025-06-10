/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
      backgroundColor: {
        none: "none",
      },
      //adicionando keyframes e animacoes
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-out-down": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(20px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.3s ease-out forwards",
        "fade-out-down": "fade-out-down 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
