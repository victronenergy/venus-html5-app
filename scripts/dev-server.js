const mockMQTT = require("./fake-broker.js").MockMQQTBroker
const webpack = require("webpack")
const webpackDevServer = require("webpack-dev-server")

const webpackConfig = require("../webpack.config.js")
const clientConfig = webpackConfig(null, { mode: "development" })

const clientCompiler = webpack(clientConfig)

// Find out the venus host ip you want to use: LAN, ethernet or Wlan connection to the device
// Try not to commit the ip :)
const clientDevServer = new webpackDevServer(clientCompiler, clientConfig.devServer)

if (process.argv[2] === "--mocked") {
  const mqtt = new mockMQTT()
  // may need to handle process.exit properly
}

clientDevServer.listen(clientConfig.devServer.port)
