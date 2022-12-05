import '~/styles/global.css'
import type { AppProps } from 'next/app'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { configurePersistable } from 'mobx-persist-store'
import * as localForage from 'localforage'
import { MuseoSans } from '~/fonts'
import { useStore } from '~/stores'

// Common configuration for MobX persistable stores, you can override them in each store configuration
configurePersistable({
  storage: typeof window !== 'undefined' ? localForage : undefined,
  expireIn: 1000 * 60 * 60 * 24 * 180, // 180 days (ms),
  removeOnExpiration: true,
  stringify: false,
  // debugMode: true, // switch it on to have console debug messages
})

const MfdApp = ({ Component, pageProps }: AppProps) => {
  const { themeStore } = useStore()

  return (
    <main className={classnames(`${MuseoSans.variable} font-sans`, { dark: themeStore.mode === 'dark' })}>
      <Component {...pageProps} />
    </main>
  )
}

export default observer(MfdApp)
