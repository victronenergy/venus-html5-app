import React, { Component } from "react"

import Fade, { viewChangeDelay } from "./Fade"
import GetInverterChargerDeviceInstance from "./../mqtt/victron/GetInverterChargerDeviceInstance"
import GetPortalId from "./../mqtt/victron/GetPortalId"
import Header from "./Header/Header"
import MqttClientProvider from "./../mqtt/MqttClientProvider"
import ShoreInputLimitSelector from "./ShoreInputLimitSelector"

import { MqttUnavailable, Metrics, RemoteConsole, Connecting, Error } from "./Views"

import Logger from "../utils/logger"
import { VIEWS } from "./../utils/constants"
import "../../css/texts.scss"
import "../../css/styles.scss"

const Main = ({ isConnected, children, setView }) => {
  return (
    <main
      className={!isConnected ? "disconnected" : ""}
      onClick={e => {
        // Bit of a hack to close "overlays" but doing it without adding event preventDefaults everywhere
        if (e.target.nodeName === "MAIN") {
          setView(VIEWS.METRICS)
        }
      }}
    >
      {children}
    </main>
  )
}

class App extends Component {
  state = {
    currentView: VIEWS.METRICS,
    viewUnmounting: false
  }

  setView = view => {
    if (this.state.currentView !== view) {
      this.setState({ viewUnmounting: true })
      setTimeout(() => this.setState({ viewUnmounting: false, currentView: view }), viewChangeDelay)
    }
  }

  handleShorePowerLimitSelected = () => {
    this.setView(VIEWS.METRICS)
  }

  toggleRemoteConsole = () => {
    if (this.state.currentView !== VIEWS.REMOTE_CONSOLE) {
      this.setView(VIEWS.REMOTE_CONSOLE)
    } else this.setView(VIEWS.METRICS)
  }

  componentDidCatch = e => {
    if (window.onerror) window.onerror(e.message, null, null, null, { stack: e.stack })
  }

  static getDerivedStateFromError() {
    return { currentView: VIEWS.ERROR, viewUnmounting: true }
  }

  render() {
    const { host, port } = this.props
    return this.state.currentView === VIEWS.ERROR ? (
      <Fade key={VIEWS.ERROR} unmount={this.state.viewUnmounting} fullWidth>
        <Error />
      </Fade>
    ) : (
      <MqttClientProvider host={host} port={port}>
        {(_, isConnected, error) => {
          if (error) {
            return <MqttUnavailable viewUnmounting={this.state.viewUnmounting} />
          } else if (!isConnected) {
            return <Connecting viewUnmounting={this.state.viewUnmounting} />
          } else {
            return (
              <GetPortalId>
                {portalId => {
                  if (!portalId) {
                    Logger.warn("No portal id yet ...")
                    return <Connecting />
                  } else {
                    return (
                      <GetInverterChargerDeviceInstance portalId={portalId}>
                        {inverterChargerDeviceId => {
                          return (
                            <>
                              <Header
                                portalId={portalId}
                                isConnected={isConnected}
                                handleRemoteConsoleButtonClicked={this.toggleRemoteConsole}
                                currentView={this.state.currentView}
                              />
                              <Main isConnected={isConnected} setView={this.setView}>
                                {(() => {
                                  switch (this.state.currentView) {
                                    case VIEWS.AMPERAGE_SELECTOR:
                                      return (
                                        <Fade
                                          key={VIEWS.AMPERAGE_SELECTOR}
                                          unmount={this.state.viewUnmounting}
                                          fullWidth
                                        >
                                          <ShoreInputLimitSelector
                                            portalId={portalId}
                                            inverterChargerDeviceId={inverterChargerDeviceId}
                                            onLimitSelected={this.handleShorePowerLimitSelected}
                                          />
                                        </Fade>
                                      )
                                    case VIEWS.REMOTE_CONSOLE:
                                      return (
                                        <Fade key={VIEWS.REMOTE_CONSOLE} unmount={this.state.viewUnmounting} fullWidth>
                                          <RemoteConsole
                                            host={host}
                                            onClickOutsideContainer={() => this.setView(VIEWS.METRICS)}
                                          />
                                        </Fade>
                                      )
                                    case VIEWS.METRICS:
                                    default:
                                      return (
                                        <Fade key={VIEWS.METRICS} unmount={this.state.viewUnmounting} fullWidth>
                                          <Metrics
                                            portalId={portalId}
                                            inverterChargerDeviceId={inverterChargerDeviceId}
                                            isConnected={isConnected}
                                            onChangeShoreInputLimitClicked={() => this.setView(VIEWS.AMPERAGE_SELECTOR)}
                                          />
                                        </Fade>
                                      )
                                  }
                                })()}
                              </Main>
                            </>
                          )
                        }}
                      </GetInverterChargerDeviceInstance>
                    )
                  }
                }}
              </GetPortalId>
            )
          }
        }}
      </MqttClientProvider>
    )
  }
}

export default App
