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
        "hide-remote-console": { raw: "(max-width: 600px), (max-height: 550px)" },
        // custom media queries that also use the min-height property
        "sm-s": {
          raw: "(min-width: 540px) and (min-height: 400px)",
        },
        "sm-m": {
          raw: "(min-width: 540px) and (min-height: 550px)",
        },
        "sm-l": {
          raw: "(min-width: 540px) and (min-height: 700px)",
        },
        "sm-xl": {
          raw: "(min-width: 540px) and (min-height: 1000px)",
        },
        "md-s": {
          raw: "(min-width: 800px) and (min-height: 400px)",
        },
        "md-m": {
          raw: "(min-width: 800px) and (min-height: 550px)",
        },
        "md-l": {
          raw: "(min-width: 800px) and  (min-height: 700px)",
        },
        "md-xl": {
          raw: "(min-width: 800px) and  (min-height: 1000px)",
        },
        "lg-s": {
          raw: "(min-width: 1400px) and (min-height: 400px)",
        },
        "lg-m": {
          raw: "(min-width: 1400px) and (min-height: 550px)",
        },
        "lg-l": {
          raw: "(min-width: 1400px) and (min-height: 700px)",
        },
        "lg-xl": {
          raw: "(min-width: 1400px) and (min-height: 1000px)",
        },
        "xl-s": {
          raw: "(min-width: 1800px) and (min-height: 400px)",
        },
        "xl-m": {
          raw: "(min-width: 1800px) and (min-height: 550px)",
        },
        "xl-l": {
          raw: "(min-width: 1800px) and (min-height: 700px)",
        },
        "xl-xl": {
          raw: "(min-width: 1800px) and (min-height: 1000px)",
        },
        'h-short': { 'raw': '(min-height: 368px)' },
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
            200: "#272622",
          },
          gray: {
            DEFAULT: "#969591",
            dark: "#969591",
            200: "#272622",
            300: "#504F4B",
            400: "#64635F",
            500: "#969591",
            600: "#DCDBD7",
            900: "#FAF9F5",
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
          yellow: {
            DEFAULT: "#F0962E",
            dark: "#F0962E",
          },
        },
      },
      fontFamily: {
        sans: ["MuseoSans", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        full: "9999px",
        DEFAULT: "0.25rem",
      },
      fontSize: {
        // Font sizes corresponding with design, px values for easy reference. Line height is always 120%.
        "2xs": ["0.75rem", { lineHeight: "120%" }],
        xs: ["1rem", { lineHeight: "120%" }], // 16px
        sm: ["1.125rem", { lineHeight: "120%" }], // 18px
        base: ["1.375rem", { lineHeight: "120%" }], // 22px
        md: ["1.625rem", { lineHeight: "120%" }], // 26px
        lg: ["1.75rem", { lineHeight: "120%" }], // 28px
        xl: ["2.125rem", { lineHeight: "120%" }], // 34px
        xxl: ["2.75rem", { lineHeight: "120%" }], // 44px
        "2xl": ["3.5rem", { lineHeight: "120%" }], // 56px
        "3xl": ["4.25rem", { lineHeight: "120%" }], // 68px
        "4xl": ["5.375rem", { lineHeight: "120%" }], // 86px
      },
      strokeWidth: {
        16: "16px",
      },
      minWidth: {
        5: "1.25rem",
        7: "1.75rem",
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
