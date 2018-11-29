import React, { Component } from "react"
import { render } from "react-dom"
import metricsConfig from "../config/metricsConfig"
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

import { getParameterByName } from "../service/util"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const mqttUrl = `mqtt://${host}:${port}`
const viewChangeDelay = 500
const viewChangeTransitionDuration = viewChangeDelay - 100

export const MqttClientContext = React.createContext(null)

class App extends Component {
  state = {
    [DBUS_PATHS.BATTERY.VOLTAGE]: null,
    [DBUS_PATHS.BATTERY.CURRENT]: null,
    [DBUS_PATHS.BATTERY.POWER]: null,
    [DBUS_PATHS.BATTERY.SOC]: null,
    [DBUS_PATHS.BATTERY.STATE]: null,
    [DBUS_PATHS.BATTERY.TIME_TO_GO]: null,
    [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]: null,

    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]: null,

    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]: null,
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]: null,
    [DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID]: null,
    [DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE]: true,
    connected: false,
    currentView: VIEWS.CONNECTING,
    viewUnmounting: false
  }

  componentDidMount = () => {
    this.deviceInterface = new VenusClient(mqttUrl)
    this.deviceInterface.connect().then(
      () => {
        const dbusPaths = Object.keys(metricsConfig)
        this.deviceInterface.subscribe(dbusPaths)
      },
      err => {
        Logger.warn("Could not connect to MQTT", err)
        this.setView(VIEWS.MQTT_UNAVAILABLE)
      }
    )

    this.deviceInterface.onMessage = ({ path, value }) => {
      const metric = metricsConfig[path]
      if (!metric) {
        Logger.warn(`Received message for topic you're not listening to: ${path}`)
        return
      }

      const formattedValue = metric.formatter ? metric.formatter(value) : value
      this.setState({ [path]: metric.unit && formattedValue !== "--" ? formattedValue + metric.unit : formattedValue })
    }

    this.deviceInterface.onConnectionChanged = ({ connected }) => {
      if (this.state.currentView === VIEWS.CONNECTING && connected) {
        this.setView(VIEWS.METRICS)
      }
      this.setState({ connected })
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

  handleShorePowerLimitSelected = limit => {
    this.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT, limit)
    this.setView(VIEWS.METRICS)
  }

  handleModeSelected = mode => {
    this.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE, mode)
  }

  toggleRemoteConsole = () => {
    if (this.state.currentView !== VIEWS.REMOTE_CONSOLE) {
      this.setView(VIEWS.REMOTE_CONSOLE)
    } else this.setView(VIEWS.METRICS)
  }

  render() {
    return (
      <MqttClientProvider host={host} port={port}>
        {(status, error) => {
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
                              <p className="text text--very-small">
                                {this.state.connected ? "Connected" : "Disconnected"}
                              </p>
                              {this.state[DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE] && (
                                <button
                                  className="remote-console-button text text--very-small"
                                  onClick={this.toggleRemoteConsole}
                                  disabled={!this.state.connected}
                                >
                                  {this.state.currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
                                </button>
                              )}
                            </div>
                          </header>
                          <main
                            className={!this.state.connected ? "disconnected" : ""}
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
                                        currentLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
                                        maxLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]}
                                        productId={this.state[DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID]}
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
                                      <div id="metrics-container">
                                        <Battery
                                          soc={this.state[DBUS_PATHS.BATTERY.SOC]}
                                          state={this.state[DBUS_PATHS.BATTERY.STATE]}
                                          voltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
                                          current={this.state[DBUS_PATHS.BATTERY.CURRENT]}
                                          power={this.state[DBUS_PATHS.BATTERY.POWER]}
                                          timeToGo={this.state[DBUS_PATHS.BATTERY.TIME_TO_GO]}
                                        />
                                        <div className="multi-metric-container shore-power__container">
                                          <ActiveSource portalId={portalId} vebusInstanceId={vebusInstanceId} />
                                          <ShoreInputLimit
                                            currentLimit={
                                              this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]
                                            }
                                            isAdjustable={
                                              this.state[
                                                DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE
                                              ] && this.state.connected
                                            }
                                            setView={this.setView}
                                          />
                                        </div>
                                        <InverterCharger
                                          state={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]}
                                          activeMode={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
                                          isAdjustable={
                                            this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE] &&
                                            this.state.connected
                                          }
                                          onModeSelected={this.handleModeSelected}
                                        />
                                        <div className="multi-metric-container">
                                          <AcLoads portalId={portalId} vebusInstanceId={vebusInstanceId} />
                                          <DcLoads
                                            batteryVoltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
                                            power={this.state[DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]}
                                          />
                                        </div>
                                      </div>
                                    </Fade>
                                  )
                                case VIEWS.MQTT_UNAVAILABLE:
                                  return (
                                    <Fade key={VIEWS.MQTT_UNAVAILABLE} unmount={this.state.viewUnmounting}>
                                      <div className="error-page">
                                        <span className="text text--large">
                                          Could not connect to the MQTT server. <br />
                                          Please check that MQTT is enabled in your settings: <br />
                                          Remote Console > Settings > Services > MQTT.
                                        </span>
                                        <div className="image-container">
                                          <img src={require("../images/mqtt-settings.png")} />
                                        </div>
                                      </div>
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
