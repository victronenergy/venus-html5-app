const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['@elninotech/mfd-modules'])

module.exports = withTM({
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
  i18n,
  publicRuntimeConfig: {},
})
