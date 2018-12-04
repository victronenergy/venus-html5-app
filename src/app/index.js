import React, { Component } from "react"
import { render } from "react-dom"
import { VIEWS } from "./utils/constants"
import "../css/texts.scss"
import "../css/styles.scss"

import ShoreInputLimitSelector from "./components/ShoreInputLimitSelector"
import MqttClientProvider from "./mqtt/MqttClientProvider"
import GetPortalId from "./mqtt/Victron/GetPortalId"
import GetVebusDeviceInstance from "./mqtt/Victron/GetVebusDeviceInstance"

import MqttUnavailable from "./components/MqttUnavailable"
import Metrics from "./components/Metrics"
import RemoteConsole from "./components/RemoteConsole"
import Connecting from "./components/Connecting"

import { getParameterByName } from "./utils/util"
import Header from "./components/Header"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const viewChangeDelay = 500
const viewChangeTransitionDuration = viewChangeDelay - 100

export const MqttClientContext = React.createContext(null)

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

  render() {
    return (
      <MqttClientProvider host={host} port={port}>
        {(status, isConnected, error) => {
          if (error) {
            return (
              <Fade key={VIEWS.MQTT_UNAVAILABLE} unmount={this.state.viewUnmounting}>
                <MqttUnavailable />
              </Fade>
            )
          }

          if (!isConnected) {
            return (
              <Fade key={VIEWS.CONNECTING} unmount={this.state.viewUnmounting}>
                <Connecting />
              </Fade>
            )
          }

          return (
            <GetPortalId>
              {portalId => {
                // TODO What should happen when portal id has not been received yet?
                if (!portalId) {
                  console.warn("No portal id yet ...")
                  return <Connecting />
                }

                return (
                  <GetVebusDeviceInstance>
                    {vebusInstanceId => {
                      if (!vebusInstanceId) {
                        console.warn("No VE.Bus instance id yet ...")
                        return <Connecting />
                      }
                      return (
                        <div className="main__container">
                          <Header
                            portalId={portalId}
                            isConnected={isConnected}
                            handleRemoteConsoleButtonClicked={this.toggleRemoteConsole}
                            currentView={this.state.currentView}
                          />
                          <main
                            className={!isConnected ? "disconnected" : ""}
                            onClick={e => {
                              // Bit of a hack to close "overlays" but doing it without adding event preventDefaults everywhere
                              if (e.target.nodeName === "MAIN") {
                                this.setView(VIEWS.METRICS)
                              }
                            }}
                          >
                            {(() => {
                              switch (this.state.currentView) {
                                case VIEWS.AMPERAGE_SELECTOR:
                                  return (
                                    <Fade key={VIEWS.AMPERAGE_SELECTOR} unmount={this.state.viewUnmounting}>
                                      <ShoreInputLimitSelector
                                        portalId={portalId}
                                        vebusInstanceId={vebusInstanceId}
                                        onLimitSelected={this.handleShorePowerLimitSelected}
                                      />
                                    </Fade>
                                  )
                                case VIEWS.REMOTE_CONSOLE:
                                  return (
                                    <Fade key={VIEWS.REMOTE_CONSOLE} unmount={this.state.viewUnmounting}>
                                      <RemoteConsole
                                        host={host}
                                        onClickOutsideContainer={() => this.setView(VIEWS.METRICS)}
                                      />
                                    </Fade>
                                  )
                                case VIEWS.METRICS:
                                default:
                                  return (
                                    <Fade key={VIEWS.METRICS} unmount={this.state.viewUnmounting}>
                                      <Metrics
                                        portalId={portalId}
                                        vebusInstanceId={vebusInstanceId}
                                        isConnected={isConnected}
                                        onChangeShoreInputLimitClicked={() => this.setView(VIEWS.AMPERAGE_SELECTOR)}
                                        onModeSelected={this.handleModeSelected}
                                      />
                                    </Fade>
                                  )
                              }
                            })()}
                          </main>
                        </div>
                      )
                    }}
                  </GetVebusDeviceInstance>
                )
              }}
            </GetPortalId>
          )
        }}
      </MqttClientProvider>
    )
  }
}

class Fade extends Component {
  fadeTransition = `opacity ${viewChangeTransitionDuration}ms ease`
  state = {
    style: {
      opacity: 0,
      transition: this.fadeTransition
    }
  }

  fadeIn = () => {
    this.setState({ style: { opacity: 1, transition: this.fadeTransition } })
  }

  fadeOut = () => {
    this.setState({ style: { opacity: 0, transition: this.fadeTransition } })
  }

  componentDidMount() {
    setTimeout(this.fadeIn, 10)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.unmount && this.props.unmount) {
      setTimeout(this.fadeOut, 10)
    }
  }

  render() {
    return <div style={this.state.style}>{this.props.children}</div>
  }
}

render(<App />, document.getElementById("app"))
