const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

const conf = {
  entry: path.resolve(__dirname, "src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: path.resolve(__dirname, "src/images/"), to: path.resolve(__dirname, "dist/images") },
        { from: path.resolve(__dirname, "src/index.html"), to: path.resolve(__dirname, "dist/") },
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
        loader: "file-loader?name=/images/[name].[ext]"
      },
      {
        test: /\.ttf$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
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

  conf.plugins.push(
    new webpack.DefinePlugin({
      DEV: JSON.stringify(argv.mode === "development"),
      USE_MOCK_MQTT: JSON.stringify(argv.mode === "development" && argv.mocked)
    })
  )

  return conf
}
