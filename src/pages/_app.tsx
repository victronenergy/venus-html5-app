import '~/styles/global.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { configurePersistable } from 'mobx-persist-store'
import { MuseoSans } from '~/fonts'
import { Storage, useLanguage, useMqtt, useTheme } from '@elninotech/mfd-modules'
import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_KEY_LOCAL_STORAGE,
  LANGUAGE_OVERRIDES,
  SUPPORTED_LANGUAGES,
} from '~/utils/constants'

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
  const mqtt = useMqtt()
  const router = useRouter()
  const host =
    typeof router.query.host !== 'string'
      ? (typeof window !== 'undefined' && window.location.hostname) || 'localhost'
      : router.query.host
  const port = typeof router.query.port !== 'string' ? 9001 : +router.query.port

  // connect to mqtt
  useEffect(() => {
    if (!router.isReady || mqtt.isConnected) return
    mqtt.boot(host, port)
  }, [mqtt, host, port, router.isReady])

  // automatically use language from the GX device
  useLanguage({
    defaultLanguage: DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGES,
    localStorageKey: LANGUAGE_KEY_LOCAL_STORAGE,
    onLangChange: (newLanguage: string) => onLanguageChange(router, newLanguage),
  })

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

const onLanguageChange = async (router: NextRouter, newLanguage: string) => {
  const { pathname, query, isReady, asPath } = router
  newLanguage = LANGUAGE_OVERRIDES[newLanguage] ?? newLanguage

  // Avoid losing query parameters and only route on language change
  if (!isReady || asPath.startsWith(`/${newLanguage}`)) return

  query.locale = newLanguage
  const newPathname = pathname.startsWith('/[locale]') ?
    pathname : '/[locale]' + pathname
  await router.replace({ pathname: newPathname, query })
}

export default appWithTranslation(observer(MfdApp))
