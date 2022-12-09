import React from 'react'
import Head from 'next/head'
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const CommonPageLayout = ({ children }: Props) => {
  const { navigationStore } = useStore()

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <title>{`${navigationStore.title ? `${navigationStore.title} — ` : ''} Victron Venus MFD`}</title>
      </Head>
      <div className='dark:bg-black dark:text-white safe-h-screen min-safe-h-screen flex flex-col'>
        <Header title={navigationStore.title} />
        <div className={'h-full'}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

interface Props {
  children?: JSX.Element
}

export default observer(CommonPageLayout)
