const liveServer = require("live-server")

// Find out the venus hsot ip you want to use: LAN, ethernet or Wlan connection to the device
// Try not to commit the ip :)
let venusHost = "10.46.105.219"

if (!venusHost) {
  console.log(
    "Running without venus host set. Set the vatiable in live-server.js if you want to connect to an instance for demo data."
  )
}

const params = {
  port: 8000,
  root: "app/", // Set root directory that's being served. Defaults to cwd.
  open: `?host=${venusHost}&dev=true` // When false, it won't load your browser by default.
}

liveServer.start(params)
