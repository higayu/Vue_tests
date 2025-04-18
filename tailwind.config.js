/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(
        "hover",
        "@media(hover:hover){ &:where(:any-link, :enabled, summary):hover }"
      );
    }),
  ],
};
