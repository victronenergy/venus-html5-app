const withTM = require('next-transpile-modules')(['@elninotech/mfd-modules'])

module.exports = withTM({
  basePath: process.env.NODE_ENV === 'production' ? '/app' : '',
  reactStrictMode: true,
  poweredByHeader: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  publicRuntimeConfig: {},
})
