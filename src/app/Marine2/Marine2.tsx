import React, { useEffect, useState } from "react"
import { useLanguage, useMqtt, STATUS, useApp } from "@victronenergy/mfd-modules"
import { AppProps } from "./App"
import { mfdLanguageOptions } from "app/locales/constants"
import { observer } from "mobx-react"
import { isError } from "app/utils/util"
import { AppViews, useAppViewsStore } from "./modules/AppViews"
import BoxView from "./components/views/BoxView"
import RootView from "./components/views/RootView"
import RemoteConsoleView from "./components/views/RemoteConsoleView"
import Connecting from "./components/ui/Connecting"
import DiagnosticsView from "./components/views/DiagnosticsView"
import MqttUnavailable from "./components/ui/MqttUnavailable"
import ErrorFallback from "./components/ui/Error"

export const Marine2 = observer((props: AppProps) => {
  // init App
  useApp()

  // subscribe to language
  useLanguage(mfdLanguageOptions)

  const { host } = props
  const mqtt = useMqtt()
  const isConnected = mqtt.isConnected
  const portalId = mqtt.portalId
  const { error, status } = mqtt

  const appViewsStore = useAppViewsStore()
  const [currentView, setCurrentView] = useState(appViewsStore.currentView)

  useEffect(() => {
    setCurrentView(appViewsStore.currentView)
  }, [appViewsStore.currentView])

  const renderView = () => {
    // Boxes
    if (/^box\//i.test(currentView)) {
      return <BoxView boxId={currentView} />
    }

    // Other views
    switch (currentView) {
      case AppViews.REMOTE_CONSOLE:
        return <RemoteConsoleView host={host} />
      case AppViews.DIAGNOSTICS:
        return <DiagnosticsView />
      default:
        return <RootView />
    }
  }

  if (error && isError(error) && status !== STATUS.CONNECTING) {
    return <ErrorFallback error={error as Error} resetErrorBoundary={() => {}} />
  }

  if (error) {
    return <MqttUnavailable host={host} />
  }

  if (!isConnected || !portalId) {
    return <Connecting />
  }

  return renderView()
})
