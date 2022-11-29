import { STATUS, useApp, useLanguage, useMqtt, useTheme } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import React from "react"
import { AppProps } from "../App"
import { mfdLanguageOptions } from "../locales/constants"
import { VIEWS } from "./constants/views"
import Metrics from "./views/Metrics"

export const Marine2 = observer((props: AppProps) => {
  const { darkMode } = useTheme()
  useLanguage(mfdLanguageOptions)
  const appStore = useApp()
  const { error, status } = useMqtt()
  const { host } = props // TODO: Use for remote console

  return (
    <div className={darkMode ? "dark" : "light"}>
      {(() => {
        switch (appStore?.page) {
          default:
          case VIEWS.Metrics:
            if (error && status === STATUS.OFFLINE) {
              return <div>Offline</div> // TODO: Add offline page
            } else if (error && status !== STATUS.CONNECTING) {
              return <div>Error</div> // TODO: Add error page (use error boundaries?)
            } else if (status === STATUS.CONNECTING) {
              return <div>Connecting</div> // TODO: Add connecting page
            }

            return <Metrics />
        }
      })()}
    </div>
  )
})
