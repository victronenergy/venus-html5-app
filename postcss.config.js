module.exports = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
        grid: "no-autoplace",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    }),
    require("tailwindcss"),
  ],
}
