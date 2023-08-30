import { useAppStore, useMqtt, useTheme, useVebus, useVrmStore } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { withErrorBoundary } from "react-error-boundary"
import { getLocale, setLocale } from "react-i18nify"
import { useVisibleWidgetsStore } from "./modules"
import { Marine2 } from "./Marine2"
import Connecting from "./components/ui/Connecting"
import { appErrorBoundaryProps } from "./components/ui/Error/appErrorBoundary"
import "./css/global.css"

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const mqtt = useMqtt()
  const locale = getLocale()
  const visibleWidgetsStore = useVisibleWidgetsStore()
  const { themeStore } = useTheme()

  useVebus()

  useEffect(() => {
    if (!appStore.remote) {
      mqtt.boot(props.host, props.port)
    } else if (appStore.remote && vrmStore?.webhost && vrmStore?.portalId && vrmStore?.siteId) {
      mqtt.boot(vrmStore.webhost, null, true, vrmStore.portalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.host, props.port, appStore.remote, vrmStore.webhost, vrmStore.portalId, vrmStore.siteId, locale])

  useEffect(() => {
    if (appStore.language) {
      setLocale(appStore.language)
    }
  }, [appStore.language])

  useEffect(() => {
    visibleWidgetsStore.clearVisibleElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  useEffect(() => {
    if (themeStore.darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [themeStore.darkMode])

  return (
    <React.Suspense fallback={<Connecting />}>
      <Marine2 {...props} />
    </React.Suspense>
  )
}

export default withErrorBoundary(observer(App), appErrorBoundaryProps)
