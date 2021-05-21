import classnames from "classnames"
import { useObservableState } from "observable-hooks"
import React, { useEffect, useState } from "react"
import Fade, { viewChangeDelay } from "../components/Fade"
import Header, { HeaderWithoutMQTTData } from "./components/Header/Header"
import { InverterChargerInputLimitSelector } from "./components/InverterCharger"

import { Connecting, Error, Metrics, MqttUnavailable, RemoteConsole } from "./components/Views"

import { mqttQuery, useVebus } from "../modules"
import { useMqtt } from "../modules/Mqtt/Mqtt.provider"
import { VIEWS } from "../utils/constants"
import { AppProps } from "../App"

import { LockButtonFooter } from "./components/LockButton"
import { LockContext } from "../contexts"

type MainProps = {
  isConnected?: boolean
  children: any
  setView: Function
}
const Main = ({ isConnected, children, setView }: MainProps) => {
  return (
    <main
      className={classnames({ disconnected: !isConnected })}
      onClick={(e) => {
        // Bit of a hack to close "overlays" but doing it without adding event preventDefaults everywhere
        // @ts-ignore
        if (e.target.nodeName === "MAIN") {
          setView(VIEWS.METRICS)
        }
      }}
    >
      {children}
    </main>
  )
}

export const MarineApp = (props: AppProps) => {
  const { host, port } = props
  const [currentView, setCurrentView] = useState(VIEWS.METRICS)
  const [viewUnmounting, setViewUnmounting] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setTotalPages] = useState(1)
  const [screenLocked, toggleLocked] = useState(true)
  const portalId = useObservableState(mqttQuery.portalId$)
  const isConnected = useObservableState(mqttQuery.isConnected$)
  const error = useObservableState(mqttQuery.error$)
  const mqttService = useMqtt()
  const { instanceId: vebusInstanceId } = useVebus()

  const setPage = (currentPage: number) => {
    setCurrentPage(currentPage)
  }

  const setPages = (pages: number) => {
    setTotalPages(pages)
    setCurrentPage(0)
  }

  const setView = (view: string) => {
    if (currentView !== view) {
      setViewUnmounting(true)
      setTimeout(() => {
        setCurrentView(view)
        setViewUnmounting(false)
      }, viewChangeDelay)
    }
  }

  const handleShorePowerLimitSelected = () => {
    setView(VIEWS.METRICS)
  }

  const toggleRemoteConsole = () => {
    if (currentView !== VIEWS.REMOTE_CONSOLE) {
      setView(VIEWS.REMOTE_CONSOLE)
    } else setView(VIEWS.METRICS)
  }

  useEffect(() => {
    console.log("Booting MQTT from App")
    mqttService.boot(host, port)
    // MqttService "changes" on every render so we don't want it as a dependency as it causes a loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host, port])

  if (currentView === VIEWS.ERROR) {
    return (
      <Fade key={VIEWS.ERROR} unmount={viewUnmounting} fullWidth>
        <Error />
      </Fade>
    )
  }

  if (error) {
    return (
      <>
        <HeaderWithoutMQTTData handleRemoteConsoleButtonClicked={toggleRemoteConsole} currentView={currentView} />
        {(() => {
          switch (currentView) {
            case VIEWS.REMOTE_CONSOLE:
              return (
                <Main isConnected={isConnected} setView={setView}>
                  <Fade key={VIEWS.REMOTE_CONSOLE} unmount={viewUnmounting} fullWidth>
                    <RemoteConsole host={host} onClickOutsideContainer={() => setView(VIEWS.METRICS)} />
                  </Fade>
                </Main>
              )
            default:
              return <MqttUnavailable viewUnmounting={viewUnmounting} />
          }
        })()}
      </>
    )
  }

  if (!isConnected || !portalId) {
    return <Connecting viewUnmounting={viewUnmounting} />
  }

  return (
    <LockContext.Provider value={{ screenLocked, toggleLocked: () => toggleLocked }}>
      <>
        <Header
          handleRemoteConsoleButtonClicked={toggleRemoteConsole}
          currentView={currentView}
          setPage={setPage}
          currentPage={currentPage}
          pages={pages}
        />
        <Main isConnected={isConnected} setView={setView}>
          {(() => {
            switch (currentView) {
              case VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR:
                return (
                  <Fade key={VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR} unmount={viewUnmounting}>
                    <InverterChargerInputLimitSelector onLimitSelected={handleShorePowerLimitSelected} />
                  </Fade>
                )
              case VIEWS.REMOTE_CONSOLE:
                return (
                  <Fade key={VIEWS.REMOTE_CONSOLE} unmount={viewUnmounting} fullWidth>
                    <RemoteConsole host={host} onClickOutsideContainer={() => setView(VIEWS.METRICS)} />
                  </Fade>
                )
              case VIEWS.METRICS:
              default:
                return (
                  <Fade key={VIEWS.METRICS} unmount={viewUnmounting} fullWidth>
                    <Metrics
                      inverterChargerDeviceId={vebusInstanceId}
                      isConnected={isConnected}
                      onChangeInverterChargerInputLimitClicked={() =>
                        setView(VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR)
                      }
                      setPages={setPages}
                      currentPage={currentPage}
                      pages={pages}
                    />
                  </Fade>
                )
            }
          })()}
        </Main>
        <LockButtonFooter currentView={currentView} />
      </>
    </LockContext.Provider>
  )
}
