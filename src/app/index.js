import React, { Component } from "react"
import { render } from "react-dom"
import { DBUS_PATHS } from "../config/dbusPaths"
import VenusClient from "../service/index"
import Logger from "../logging/logger"
import { VIEWS } from "../config/enums"
import "../css/texts.scss"
import "../css/styles.scss"

import ActiveSource from "./components/ActiveSource"
import ShoreInputLimit from "./components/ShoreInputLimit"
import ShoreInputLimitSelector from "./components/ShoreInputLimitSelector"
import InverterCharger from "./components/InverterCharger"
import Battery from "./components/Battery"
import AcLoads from "./components/AcLoads"
import DcLoads from "./components/DcLoads"
import MqttClientProvider from "./mqtt/MqttClientProvider"
import MqttTopicWildcard from "./mqtt/MqttTopicWildcard"

import MqttUnavailable from "./components/MqttUnavailable"
import Metrics from "./components/Metrics"

import { getParameterByName } from "../service/util"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const mqttUrl = `mqtt://${host}:${port}`
const viewChangeDelay = 500
const viewChangeTransitionDuration = viewChangeDelay - 100

export const MqttClientContext = React.createContext(null)

class App extends Component {
  state = {
    [DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE]: true,
    currentView: VIEWS.CONNECTING,
    viewUnmounting: false
  }

  componentDidMount = () => {
    this.deviceInterface = new VenusClient(mqttUrl)
    this.deviceInterface.connect().then(
      () => {
        // No longer subscribe to anything
      },
      err => {
        Logger.warn("Could not connect to MQTT", err)
        this.setView(VIEWS.MQTT_UNAVAILABLE)
      }
    )
    this.deviceInterface.onConnectionChanged = ({ connected }) => {
      if (this.state.currentView === VIEWS.CONNECTING && connected) {
        this.setView(VIEWS.METRICS)
      }
    }

    // TODO Remove this
    this.setState({ deviceInterface: this.deviceInterface })
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
          return (
            <MqttTopicWildcard wildcard={`N/+/system/0/Serial`}>
              {messages => {
                if (Object.entries(messages).length === 0) {
                  return <div>Loading...</div>
                }

                // Only one path will match this wildcard, so just take the value from the first one
                const firstMessage = Object.entries(messages)[0]
                let portalId = firstMessage[1] ? firstMessage[1].value : null
                if (!portalId) {
                  // return <div>Still loading...</div>
                  portalId = "+"
                }

                return (
                  <MqttTopicWildcard wildcard={`N/+/vebus/+/DeviceInstance`}>
                    {messages => {
                      if (Object.entries(messages).length === 0) {
                        return <div>Loading...</div>
                      }

                      const firstMessage = Object.entries(messages)[0]
                      // You can only have one VE.Bus device in a system, so just take the first one
                      let vebusInstanceId = firstMessage[1] ? firstMessage[1].value : null
                      if (!vebusInstanceId) {
                        // return <div>Still loading...</div>
                        vebusInstanceId = "+"
                      }
                      return (
                        <div className="main__container">
                          <header>
                            <img src={require("../images/icons/logo.png")} className="logo" />
                            <div className="connection">
                              <img src={require("../images/icons/connected.svg")} className="connection__icon" />
                              <p className="text text--very-small">{isConnected ? "Connected" : "Disconnected"}</p>
                              {this.state[DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE] && (
                                <button
                                  className="remote-console-button text text--very-small"
                                  onClick={this.toggleRemoteConsole}
                                  disabled={!isConnected}
                                >
                                  {this.state.currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
                                </button>
                              )}
                            </div>
                          </header>
                          <main
                            className={!isConnected ? "disconnected" : ""}
                            onClick={e => {
                              // Bit of a hack to close "overlays" but doing it without adding event preventDefaults everywhere
                              if (
                                e.target.nodeName === "MAIN" &&
                                this.state.state.currentView !== VIEWS.MQTT_UNAVAILABLE
                              ) {
                                this.setView(VIEWS.METRICS)
                              }
                            }}
                          >
                            {(() => {
                              switch (this.state.currentView) {
                                case VIEWS.CONNECTING:
                                  return (
                                    <Fade key={VIEWS.CONNECTING} unmount={this.state.viewUnmounting}>
                                      <div className="loading">
                                        <p className="text text--very-large">Connecting</p>
                                        <div className="loading__dots">
                                          <p className="dot">.</p>
                                          <p className="dot two">.</p>
                                          <p className="dot three">.</p>
                                        </div>
                                      </div>
                                    </Fade>
                                  )
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
                                      <div
                                        className="remote-console__container"
                                        onClick={() => {
                                          this.setView(VIEWS.METRICS)
                                        }}
                                      >
                                        <iframe className="remote-console" src={"http://" + host} />
                                        <span className="text text--large remote-console__small_screen_info">
                                          Open in a larger screen to view remote console.
                                        </span>
                                      </div>
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
                                case VIEWS.MQTT_UNAVAILABLE:
                                  return (
                                    <Fade key={VIEWS.MQTT_UNAVAILABLE} unmount={this.state.viewUnmounting}>
                                      <MqttUnavailable />
                                    </Fade>
                                  )
                              }
                            })()}
                          </main>
                        </div>
                      )
                    }}
                  </MqttTopicWildcard>
                )
              }}
            </MqttTopicWildcard>
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
