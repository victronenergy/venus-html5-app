import React, { Component } from "react"

import classnames from "classnames"
import Fade, { viewChangeDelay } from "./Fade"
import GetInverterChargerDeviceInstance from "./../mqtt/victron/GetInverterChargerDeviceInstance"
import GetPortalId from "./../mqtt/victron/GetPortalId"
import Header, { HeaderWithoutMQTTData } from "./Header/Header"
import { InverterChargerInputLimitSelector } from "./InverterCharger"
import MqttClientProvider from "./../mqtt/MqttClientProvider"

import { MqttUnavailable, Metrics, RemoteConsole, Connecting, Error } from "./Views"

import Logger from "../utils/logger"
import { VIEWS } from "./../utils/constants"
import "../../css/texts.scss"
import "../../css/styles.scss"

import { LockButtonFooter } from "./LockButton/LockButton"
import { LockContext } from "../contexts"

const Main = ({ isConnected, children, setView }) => {
  return (
    <main
      className={classnames({ disconnected: !isConnected })}
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
    viewUnmounting: false,
    currentPage: 0,
    pages: 1,
    screenLocked: localStorage.getItem("screenLocked") === "true",
    toggleLock: this.toggleLock
  }

  componentDidUpdate = () => {
    localStorage.setItem("screenLocked", this.state.screenLocked)
  }

  toggleLocked = () => {
    this.setState(state => ({
      screenLocked: state.screenLocked ? false : true
    }))
  }

  setPage = currentPage => {
    this.setState({ currentPage })
  }

  setPages = pages => {
    this.setState({ currentPage: 0, pages })
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
            return (
              <LockContext.Provider
                value={{
                  screenLocked: this.state.screenLocked,
                  showLockButton: false
                }}
              >
                <>
                  <HeaderWithoutMQTTData
                    handleRemoteConsoleButtonClicked={this.toggleRemoteConsole}
                    handleLockScreenButtonClicked={this.toggleLock}
                    currentView={this.state.currentView}
                  />
                  {(() => {
                    switch (this.state.currentView) {
                      case VIEWS.REMOTE_CONSOLE:
                        return (
                          <Main isConnected={isConnected} setView={this.setView}>
                            <Fade key={VIEWS.REMOTE_CONSOLE} unmount={this.state.viewUnmounting} fullWidth>
                              <RemoteConsole host={host} onClickOutsideContainer={() => this.setView(VIEWS.METRICS)} />
                            </Fade>
                          </Main>
                        )
                      default:
                        return <MqttUnavailable viewUnmounting={this.state.viewUnmounting} />
                    }
                  })()}
                </>
              </LockContext.Provider>
            )
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
                            <LockContext.Provider
                              value={{
                                screenLocked: this.state.screenLocked,
                                toggleLocked: this.toggleLocked
                              }}
                            >
                              <>
                                <Header
                                  portalId={portalId}
                                  handleRemoteConsoleButtonClicked={this.toggleRemoteConsole}
                                  handleLockScreenButtonClicked={this.toggleLock}
                                  currentView={this.state.currentView}
                                  setPage={this.setPage}
                                  currentPage={this.state.currentPage}
                                  pages={this.state.pages}
                                />
                                <Main isConnected={isConnected} setView={this.setView}>
                                  {(() => {
                                    switch (this.state.currentView) {
                                      case VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR:
                                        return (
                                          <Fade
                                            key={VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR}
                                            unmount={this.state.viewUnmounting}
                                          >
                                            <InverterChargerInputLimitSelector
                                              portalId={portalId}
                                              inverterChargerDeviceId={inverterChargerDeviceId}
                                              onLimitSelected={this.handleShorePowerLimitSelected}
                                            />
                                          </Fade>
                                        )
                                      case VIEWS.REMOTE_CONSOLE:
                                        return (
                                          <Fade
                                            key={VIEWS.REMOTE_CONSOLE}
                                            unmount={this.state.viewUnmounting}
                                            fullWidth
                                          >
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
                                              onChangeInverterChargerInputLimitClicked={() =>
                                                this.setView(VIEWS.INVERTER_CHARGER_INPUT_LIMIT_SELECTOR)
                                              }
                                              setPages={this.setPages}
                                              currentPage={this.state.currentPage}
                                              pages={this.state.pages}
                                            />
                                          </Fade>
                                        )
                                    }
                                  })()}
                                </Main>
                                <LockButtonFooter currentView={this.state.currentView} />
                              </>
                            </LockContext.Provider>
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
