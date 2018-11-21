const cypress = require("cypress")
const httpServer = require("http-server")

const server = httpServer.createServer({
  root: "dist/"
})

server.listen(8000)

return cypress.run().then(results => {
  server.close()
  return
})
