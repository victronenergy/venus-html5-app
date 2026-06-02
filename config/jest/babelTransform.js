const babelJest = require("babel-jest")

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
    return false
  }

  try {
    require.resolve("react/jsx-runtime")
    return true
  } catch (e) {
    return false
  }
})()

module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve("@babel/preset-env"),
      {
        useBuiltIns: "entry",
        corejs: require("core-js/package.json").version,
        exclude: ["transform-typeof-symbol"],
      },
    ],
    [
      require.resolve("@babel/preset-react"),
      {
        development: true,
        runtime: hasJsxRuntime ? "automatic" : "classic",
      },
    ],
    require.resolve("@babel/preset-typescript"),
  ],
  plugins: [require.resolve("babel-plugin-macros")],
  babelrc: false,
  configFile: false,
})
