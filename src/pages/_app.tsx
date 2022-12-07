import '~/styles/global.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useMemo } from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { configurePersistable } from 'mobx-persist-store'
import { MuseoSans } from '~/fonts'
import { Storage, useTheme } from '@elninotech/mfd-modules'
import { NextPage } from 'next'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Common configuration for MobX persistable stores, you can override them in each store configuration
configurePersistable({
  storage: typeof window !== 'undefined' ? Storage : undefined,
  expireIn: 1000 * 60 * 60 * 24 * 180, // 180 days (ms),
  removeOnExpiration: true,
  stringify: false,
  // debugMode: true, // switch it on to have console debug messages
})

const MfdApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { darkMode } = useTheme()

  // try to use layout defined at the page level, if available
  const getLayout = useMemo(() => {
    return Component.getLayout ?? ((page: ReactNode) => page)
  }, [Component.getLayout])

  return (
    <main className={classnames(`${MuseoSans.variable} font-sans`, { dark: darkMode })}>
      {getLayout(<Component {...pageProps} />)}
    </main>
  )
}

export default observer(MfdApp)
