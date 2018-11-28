const mockMQTT = require("./fake-broker.js").MockMQQTBroker
const webpack = require("webpack")
const webpackDevServer = require("webpack-dev-server")

const webpackConfig = require("../webpack.config.js")
const clientConfig = webpackConfig(null, { mode: "development" })

const clientCompiler = webpack(clientConfig)

const clientDevServer = new webpackDevServer(clientCompiler, clientConfig.devServer)

if (process.argv[2] === "--mocked") {
  const mqtt = new mockMQTT()
  // may need to handle process.exit properly
}

clientDevServer.listen(clientConfig.devServer.port)
