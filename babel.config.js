module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "45"
        },
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [["@babel/plugin-proposal-class-properties"]]
}
