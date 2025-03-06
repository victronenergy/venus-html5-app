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
          victronGray: "var(--c-surface-victron-gray)",
          victronBlue: "var(--c-surface-victron-blue)",
          victronRed: "var(--c-surface-victron-red)",
          victronYello: "var(--c-surface-victron-yellow)",
          victronLime: "var(--c-surface-victron-lime)",
          victronCyan: "var(--c-surface-victron-cyan)",
          victronSlate: "var(--c-surface-victron-slate)",
          victronGreen: "var(--c-surface-victron-green)",
          victronPurple: "var(--c-surface-victron-purple)",
        },
        outline: {
          primary: "var(--c-outline-primary)",
          secondary: "var(--c-outline-secondary)",
        },
        content: {
          primary: "var(--c-content-primary)",
          secondary: "var(--c-content-secondary)",
          tertiary: "var(--c-content-tertiary)",
          victronGray: "var(--c-content-victron-gray)",
          victronBlue: "var(--c-content-victron-blue)",
          victronRed: "var(--c-content-victron-red)",
          victronYellow: "var(--c-content-victron-yello)",
          victronLime: "var(--c-content-victron-lime)",
          victronCyan: "var(--c-content-victron-cyan)",
          victronSlate: "var(--c-content-victron-slate)",
          victronGreen: "var(--c-content-victron-green)",
          victronPurple: "var(--c-content-victron-purple)",
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
