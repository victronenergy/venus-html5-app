const path = require("path")

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "app/js/index.js"),
  output: {
    path: path.resolve(__dirname, "app/js"), // string
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "app/")],
        use: "babel-loader"
      }
    ]
  },
  devtool: "source-map"
}
