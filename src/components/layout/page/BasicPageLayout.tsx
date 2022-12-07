import React from 'react'
import Head from 'next/head'

const BasicPageLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`${title ? `${title} — ` : ''} Victron Venus MFD`}</title>
      </Head>
      <main className={'dark:bg-black dark:text-white'}>{children}</main>
    </>
  )
}

interface Props {
  title?: string
  children?: JSX.Element | string
}

export default BasicPageLayout
