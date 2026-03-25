/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#121212",
        card: "#1E1E1E",
        navFontC: "#D1D1D1",
        font1: "#FFFFFF",
        secondF: "#B0B0B0",
        buttn: "#00905c",
        hvrbuttn: "#006f41",
      },
      backgroundImage: {
        "btn-gradient": "linear-gradient(90deg, #00905c 0%, #34d399 100%)",
        "btn-gradient-hover":
          "linear-gradient(90deg, #34d399 0%, #00905c 100%)",
      },
    },
  },
  plugins: [],
};
