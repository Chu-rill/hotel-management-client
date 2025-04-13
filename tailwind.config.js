// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  // rest of your config...
  theme: {
    extend: {
      // your theme extensions
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Add a `light` variant, to use when the `.light` class is applied
      addVariant("light", ":is(:where(.light) &, .light:where(:not(.dark)) &)");
    }),
  ],
  keyframes: {
    "caret-blink": {
      "0%,70%,100%": { opacity: "1" },
      "20%,50%": { opacity: "0" },
    },
  },
  animation: {
    "caret-blink": "caret-blink 1.25s ease-out infinite",
  },
};
