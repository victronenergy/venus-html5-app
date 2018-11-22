const liveServer = require("live-server")
const mockMQTT = require("../../fake-broker.js").MockMQQTBroker

const params = {
  port: 8002,
  root: "test/displays",
  watch: ["dist/", "test/displays"],
  mount: [["/dist", "./dist"]]
}

const mqtt = new mockMQTT(9002)
liveServer.start(params)
