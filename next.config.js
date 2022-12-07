const withTM = require('next-transpile-modules')(['@elninotech/mfd-modules'])

module.exports = withTM({
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig: {},
})
