import '~/styles/global.css'
import type { AppProps } from 'next/app'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { configurePersistable } from 'mobx-persist-store'
import { MuseoSans } from '~/fonts'
import { Storage, useTheme } from '@elninotech/mfd-modules'

// Common configuration for MobX persistable stores, you can override them in each store configuration
configurePersistable({
  storage: typeof window !== 'undefined' ? Storage : undefined,
  expireIn: 1000 * 60 * 60 * 24 * 180, // 180 days (ms),
  removeOnExpiration: true,
  stringify: false,
  // debugMode: true, // switch it on to have console debug messages
})

const MfdApp = ({ Component, pageProps }: AppProps) => {
  const { darkMode } = useTheme()

  return (
    <main className={classnames(`${MuseoSans.variable} font-sans`, { dark: darkMode })}>
      <Component {...pageProps} />
    </main>
  )
}

export default observer(MfdApp)
