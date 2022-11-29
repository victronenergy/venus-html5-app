import NextDocument, { Head, Html, Main, NextScript } from "next/document"
import React from 'react'

export default class Document extends NextDocument {
  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html className={'h-full'}>
        <Head/>
        <body className={'h-full'}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
