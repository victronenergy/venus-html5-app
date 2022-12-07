import React from 'react'
import Head from 'next/head'
import Header from '@components/layout/page/Header'
import Footer from '@components/layout/page/Footer'

const CommonPageLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title ? `${title} — ` : ''} Victron Venus MFD`}</title>
      </Head>
      <div className='dark:bg-black dark:text-white safe-h-screen min-safe-h-screen flex flex-col'>
        <Header title={title} />
        <div className={'h-full'}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

interface Props {
  title?: string
  children?: JSX.Element
}

export default CommonPageLayout
