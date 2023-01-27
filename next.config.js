const withTM = require('next-transpile-modules')(['@elninotech/mfd-modules'])

function getBasePath() {
  if (process.env.BASE_PATH !== undefined) {
    return process.env.BASE_PATH
  }

  return process.env.NODE_ENV === 'production' ? '/app' : ''
}

module.exports = withTM({
  basePath: getBasePath(),
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
