const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    // only Marine2 uses TailwindCSS, so we only need to include the files from that folder
    "./src/app/Marine2/**/*.{js,ts,jsx,tsx}",
  ],
  // we try to use the default theme as much as possible,
  // see https://tailwindcss.com/docs/theme
  theme: {
    extend: {
      screens: {
        sm: "540px",
        md: "800px",
        lg: "1400px",
        xl: "1800px",
      },
      colors: {
        victron: {
          lightGray: {
            DEFAULT: "#F5F5F5",
            dark: "#F5F5F5",
          },
          darkGray: {
            DEFAULT: "#141414",
            dark: "#141414",
          },
          gray: {
            DEFAULT: "#969591",
            dark: "#969591",
          },
          blue: {
            DEFAULT: "#387DC5",
            dark: "#387DC5",
          },
          red: {
            DEFAULT: "#F35C58",
            dark: "#F35C58",
          },
          cyan: {
            DEFAULT: "#84CBF8",
            dark: "#84CBF8",
          },
          purple: {
            DEFAULT: "#6B4AB3",
            dark: "#6B4AB3",
          },
          lime: {
            DEFAULT: "#76832C",
            dark: "#76832C",
          },
          green: {
            DEFAULT: "#72B84C",
            dark: "#72B84C",
          },
          slate: {
            DEFAULT: "#7F7F9C",
            dark: "#7F7F9C",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-museo-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        full: "9999px",
        DEFAULT: "0.25rem",
      },
    },
  },
  // Garmin and Furuno devices don't support the RGB colors with opacity,
  // so we disable the CSS opacity variants for all colors
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("@tailwindcss/line-clamp")],
}
