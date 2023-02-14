import React, { useEffect, useState } from "react"
// import { useState } from "react"
// import Fade, { viewChangeDelay } from "../components/Fade"

// import { HeaderWithoutMQTTData } from "./components/Header/Header"
// import { Connecting, Error, MqttUnavailable, RemoteConsole } from "./components/Views"

import { useLanguage, useMqtt, STATUS } from "@elninotech/mfd-modules"
import { AppProps } from "./App"

import { mfdLanguageOptions } from "app/locales/constants"
import { observer } from "mobx-react"
import { isError } from "app/utils/util"

import { AppViews, useAppViewsStore } from "./modules/AppViews"
import BoxView from "./components/views/BoxView"
import RootView from "./components/views/RootView"
import RemoteConsoleView from "./components/views/RemoteConsoleView"
import Connecting from "./components/ui/Connecting"

// type MainProps = {
//   isConnected?: boolean
//   children: any
//   setView: Function
// }
// const Main = ({ isConnected, children, setView }: MainProps) => {
//   return (
//     <main
//       className={classnames({ disconnected: !isConnected })}
//       onClick={(e) => {
//         // Bit of a hack to close "overlays" but doing it without adding event preventDefaults everywhere
//         // @ts-ignore
//         if (e.target.nodeName === "MAIN") {
//           setView(VIEWS.METRICS)
//         }
//       }}
//     >
//       {children}
//     </main>
//   )
// }

export const Marine2 = observer((props: AppProps) => {
  const { host } = props
  // subscribe to language
  useLanguage(mfdLanguageOptions)
  // const [viewUnmounting, setViewUnmounting] = useState(false)
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
      // todo: add other views
      case AppViews.REMOTE_CONSOLE:
        return <RemoteConsoleView host={host} />
      default:
        return <RootView />
    }
  }

  if (error && isError(error) && status !== STATUS.CONNECTING) {
    return (
      // <Fade key={VIEWS.ERROR} unmount={viewUnmounting} fullWidth>
      <div>Error</div>
      // {/*<Error error={error} />*/}
      // </Fade>
    )
  }

  // todo: this is a special state for mqqt connection error, but it also happens
  //  when the mqtt server is just connecting. We need to handle this better
  // if (error) {
  //   return (
  //     <div>Error</div>
  // <>
  //   <HeaderWithoutMQTTData handleRemoteConsoleButtonClicked={toggleRemoteConsole} currentView={currentView} />
  //   {(() => {
  //     switch (currentView) {
  //       case VIEWS.REMOTE_CONSOLE:
  //         return (
  //           <Main isConnected={isConnected} setView={setView}>
  //             <Fade key={VIEWS.REMOTE_CONSOLE} unmount={viewUnmounting} fullWidth>
  //               <RemoteConsole host={host} onClickOutsideContainer={() => setView(VIEWS.METRICS)} />
  //             </Fade>
  //           </Main>
  //         )
  //       default:
  //         return <MqttUnavailable viewUnmounting={viewUnmounting} />
  //     }
  //   })()}
  // </>
  // )
  // }

  if (!isConnected || !portalId) {
    return <Connecting />
  }

  return renderView()
})
