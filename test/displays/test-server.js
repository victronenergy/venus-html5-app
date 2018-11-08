const liveServer = require("live-server")

//Run this file with dev-compile:mocked on to get all the different sized UIs visible with mocked deps

const params = {
  port: 8001,
  root: "test/displays",
  watch: ["dist/", "test/displays"],
  mount: [["/dist", "./dist"]]
}

liveServer.start(params)
