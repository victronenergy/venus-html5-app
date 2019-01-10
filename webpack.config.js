const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

const conf = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.[hash].js"
  },
  devServer: {
    port: 8000,
    quiet: true,
    hot: true,
    overlay: true
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ["Your application is running on http://localhost:8000/?host=localhost&dev=true"]
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/browser-info.html"),
      filename: "browser-info.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/radiator.html"),
      filename: "radiator.html",
      chunks: []
    })
  ],
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src/")],
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.svg$|\.png$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.ttf$|\.woff2?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts"
            }
          }
        ]
      }
    ]
  }
}

module.exports = (_env, argv) => {
  if (argv.mode === "development") {
    conf.devtool = "source-map"
  }
  conf.plugins.push(
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      ENV: argv.mode === "production" ? "production" : "develpoment"
    })
  )
  return conf
}
