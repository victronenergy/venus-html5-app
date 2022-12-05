import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class Document extends NextDocument {
  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
