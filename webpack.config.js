const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "app/js/index.js"),
  output: {
    path: path.resolve(__dirname, "dist/js"), // string
    filename: "bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: path.resolve(__dirname, "app/css/"), to: path.resolve(__dirname, "dist/css") },
        { from: path.resolve(__dirname, "app/images/"), to: path.resolve(__dirname, "dist/images") },
        { from: path.resolve(__dirname, "app/vendor/"), to: path.resolve(__dirname, "dist/vendor") },
        { from: path.resolve(__dirname, "app/index.html"), to: path.resolve(__dirname, "dist/") }
      ],
      {}
    ),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "app/")],
        use: "babel-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  }
}
