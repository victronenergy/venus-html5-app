module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
          grid: "no-autoplace",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    "tailwindcss",
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    "postcss-normalize",
  ],
}
