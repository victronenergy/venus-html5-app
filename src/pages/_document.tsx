import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { DEFAULT_LANGUAGE } from '~/utils/constants'

export default class Document extends NextDocument {
  render() {
    const queryLocale = this.props.__NEXT_DATA__.query.locale
    const locale = typeof queryLocale === 'string' && queryLocale ? queryLocale : DEFAULT_LANGUAGE
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang={locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
