const liveServer = require("live-server")
const mockMQTT = require("./fake-broker.js").MockMQQTBroker

// Find out the venus host ip you want to use: LAN, ethernet or Wlan connection to the device
// Try not to commit the ip :)
let venusHost
let mqtt

if (!venusHost) {
  venusHost = "localhost"
}

const params = {
  port: 8000,
  root: "dist/",
  watch: "dist/",
  open: `?host=${venusHost}&dev=true`
}

if (process.argv[2] === "--mocked") mqtt = new mockMQTT(9001)
liveServer.start(params)
