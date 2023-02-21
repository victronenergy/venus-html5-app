const fs = require("fs")
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware")
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware")
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware")
const ignoredFiles = require("react-dev-utils/ignoredFiles")
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware")
const paths = require("./paths")
const getHttpsConfig = require("./getHttpsConfig")

const host = process.env.HOST || "0.0.0.0"
const sockHost = process.env.WDS_SOCKET_HOST
const sockPath = process.env.WDS_SOCKET_PATH // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT

module.exports = function (proxy, allowedHost) {
  return {
    devServer: {
      host,
      allowedHosts : !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true" ? "all" : allowedHost,
      // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
      proxy,
      client: {
        overlay: false,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        logging: 'none',
        webSocketTransport: 'ws',
        webSocketURL: {
          // Enable custom sockjs pathname for websocket connection to hot reloading server.
          // Enable custom sockjs hostname, pathname and port for websocket connection
          // to hot reloading server.
          hostname: sockHost,
          pathname: sockPath,
          port: sockPort,
        },
      },
      // Use 'ws' instead of 'sockjs-node' on server since we're using native
      // websockets in `webpackHotDevClient`.
      webSocketServer: 'ws',
      // Enable gzip compression of generated files.
      compress: true,
      https: getHttpsConfig(),
      historyApiFallback: {
        // Paths with dots should still use the history fallback.
        // See https://github.com/facebook/create-react-app/issues/387.
        disableDotRule: true,
        index: paths.publicUrlOrPath,
      },
      // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
      devMiddleware: {
        // It is important to tell WebpackDevServer to use the same "publicPath" path as
        // we specified in the webpack config. When homepage is '.', default to serving
        // from the root.
        // remove last slash so user can land on `/test` instead of `/test/`
        publicPath: paths.publicUrlOrPath.slice(0, -1),
      },
      static: {
        // By default WebpackDevServer serves physical files from current directory
        // in addition to all the virtual build products that it serves from memory.
        // This is confusing because those files won’t automatically be available in
        // production build folder unless we copy them. However, copying the whole
        // project directory is dangerous because we may expose sensitive files.
        // Instead, we establish a convention that only files in `public` directory
        // get served. Our build script will copy `public` into the `build` folder.
        // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
        // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
        // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
        // Note that we only recommend to use `public` folder as an escape hatch
        // for files like `favicon.ico`, `manifest.json`, and libraries that are
        // for some reason broken when imported through webpack. If you just want to
        // use an image, put it in `src` and `import` it from JavaScript instead.
        directory: paths.appPublic,
        publicPath: paths.publicUrlOrPath,
        watch: {
          // Reportedly, this avoids CPU overload on some systems.
          // https://github.com/facebook/create-react-app/issues/293
          // src/node_modules is not ignored to support absolute imports
          // https://github.com/facebook/create-react-app/issues/1065
          ignored: ignoredFiles(paths.appSrc),
        }
      },

      onBeforeSetupMiddleware(server) {
        if (!server) {
          throw new Error('webpack-dev-server is not defined');
        }

        // Keep `evalSourceMapMiddleware` and `errorOverlayMiddleware`
        // middlewares before `redirectServedPath` otherwise will not have any effect
        // This lets us fetch source contents from webpack for the error overlay
        server.app.use(evalSourceMapMiddleware(server))
        // This lets us open files from the runtime error overlay.
        server.app.use(errorOverlayMiddleware())

        if (fs.existsSync(paths.proxySetup)) {
          // This registers user provided middleware for proxy reasons
          require(paths.proxySetup)(server.app)
        }
      },
      onAfterSetupMiddleware(server) {
        // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
        server.app.use(redirectServedPath(paths.publicUrlOrPath))

        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
        server.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath))
      },
    },
    
  }
}
