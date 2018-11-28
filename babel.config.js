module.exports = {
  presets: [
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
  plugins: [["transform-react-jsx"], ["@babel/plugin-proposal-class-properties"]]
}
