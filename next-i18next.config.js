const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar', 'cs', 'de', 'es', 'it', 'nl', 'ro', 'ru', 'sv', 'tr', 'zh'],
    localeDetection: false,
  },
  localePath: path.resolve('./public/languages'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
