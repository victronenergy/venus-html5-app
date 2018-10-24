const liveServer = require("live-server")

// Find out the venus hsot ip you want to use: LAN, ethernet or Wlan connection to the device
// Try not to commit the ip :)
let venusHost

if (!venusHost) {
  console.log(
    "Running without venus host set. Set the variable in live-server.js if you want to connect to an instance for demo data."
  )
}

const params = {
  port: 8000,
  root: "dist/",
  watch: "dist/",
  open: `?host=${venusHost}&dev=true`
}

liveServer.start(params)
