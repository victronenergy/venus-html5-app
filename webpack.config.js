const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const conf = {
  entry: path.resolve(__dirname, "src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.[contenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: path.resolve(__dirname, "dist/index.html")
    }),
    new CopyWebpackPlugin(
      [
        { from: path.resolve(__dirname, "src/images/"), to: path.resolve(__dirname, "dist/images") },
        { from: path.resolve(__dirname, "src/browser-info.html"), to: path.resolve(__dirname, "dist/") }
      ],
      {}
    )
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
        test: /\.tsx?$/,
        loader: "babel-loader"
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
        test: /\.jpe?g$|\.gif$|\.png$/i,
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

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    conf.mode = "development"
    conf.devtool = "source-map"
  } else {
    conf.mode = "production"
  }
  return conf
}
