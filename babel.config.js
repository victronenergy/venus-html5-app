module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "45"
        }
      }
    ]
  ],
  plugins: [["transform-react-jsx", { pragma: "h" }], ["@babel/plugin-proposal-class-properties"]]
}
