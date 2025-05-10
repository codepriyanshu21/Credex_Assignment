// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: '#f9fafb',
        darkBg: '#1e293b',
        cardLight: '#ffffff',
        cardDark: '#1f2937',
      },
    },
  },
  plugins: [],
};
