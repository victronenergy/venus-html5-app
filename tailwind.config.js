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
        "hide-remote-console": { raw: "(max-width: 750px), (max-height: 350px)" },
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
        "h-short": { raw: "(min-height: 368px)" },
      },
      colors: {
        surface: {
          primary: "var(--c-surface-primary)",
          secondary: "var(--c-surface-secondary)",
          victronGray: "rgba(var(--c-victron-gray-rgb), 0.3)",
          victronBlue: "rgba(var(--c-victron-blue-rgb), 0.3)",
          victronRed: "rgba(var(--c-victron-red-rgb), 0.3)",
          victronYello: "rgba(var(--c-victron-yellow-rgb), 0.3)",
          victronLime: "rgba(var(--c-victron-lime-rgb), 0.3)",
          victronCyan: "rgba(var(--c-victron-cyan-rgb), 0.3)",
          victronSlate: "rgba(var(--c-victron-slate-rgb), 0.3)",
          victronGreen: "rgba(var(--c-victron-green-rgb), 0.3)",
          victronPurple: "rgba(var(--c-victron-purple-rgb), 0.3)",
        },
        outline: {
          primary: "var(--c-outline-primary)",
          secondary: "var(--c-outline-secondary)",
        },
        content: {
          primary: "var(--c-content-primary)",
          secondary: "var(--c-content-secondary)",
          tertiary: "var(--c-content-tertiary)",
          onPrimary: "var(--c-content-on-primary)",
          victronGray: "rgba(var(--c-victron-gray-rgb), 1.0)",
          victronBlue: "rgba(var(--c-victron-blue-rgb), 1.0)",
          victronRed: "rgba(var(--c-victron-red-rgb), 1.0)",
          victronYellow: "rgba(var(--c-victron-yellow-rgb), 1.0)",
          victronLime: "rgba(var(--c-victron-lime-rgb), 1.0)",
          victronCyan: "rgba(var(--c-victron-cyan-rgb), 1.0)",
          victronSlate: "rgba(var(--c-victron-slate-rgb), 1.0)",
          victronGreen: "rgba(var(--c-victron-green-rgb), 1.0)",
          victronPurple: "rgba(var(--c-victron-purple-rgb), 1.0)",
        },
      },
      fontFamily: {
        sans: ["MuseoSans", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "px-1": "var(--px1)",
        "px-2": "var(--px2)",
        "px-8": "var(--px8)",
        "px-16": "var(--px16)",
        "px-20": "var(--px20)",
        "px-24": "var(--px24)",
        "px-32": "var(--px32)",
        "px-36": "var(--px36)",
        "px-44": "var(--px44)",
      },
      borderWidth: {
        "px-1": "var(--px1)",
        "px-2": "var(--px2)",
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
        12: "12px",
        8: "8px",
        6: "6px",
        0: "0",
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
