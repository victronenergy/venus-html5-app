import { h, render, Component } from "preact"
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

import { getParameterByName } from "../service/util"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const mqttUrl = `mqtt://${host}:${port}`

class App extends Component {
  state = {
    [DBUS_PATHS.BATTERY.VOLTAGE]: null,
    [DBUS_PATHS.BATTERY.CURRENT]: null,
    [DBUS_PATHS.BATTERY.POWER]: null,
    [DBUS_PATHS.BATTERY.SOC]: null,
    [DBUS_PATHS.BATTERY.STATE]: null,
    [DBUS_PATHS.BATTERY.TIME_TO_GO]: null,
    [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]: null,

    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]: null,

    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_INPUT]: null,
    [DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1]: null,
    [DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2]: null,
    [DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]: null,

    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]: null,
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]: null,
    [DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID]: null,
    [DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE]: true,
    connected: false,
    currentView: VIEWS.METRICS
  }

  componentDidMount = () => {
    this.deviceInterface = new VenusClient(mqttUrl)
    this.deviceInterface.connect().then(() => {
      const dbusPaths = Object.keys(metricsConfig)
      this.deviceInterface.subscribe(dbusPaths)
    })

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
      this.setState({ connected })
    }

    // TODO Remove this
    this.setState({ deviceInterface: this.deviceInterface })
  }

  setView = view => {
    this.setState({ currentView: view })
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

  render(props, state) {
    return (
      <div class="main__container">
        <header>
          <img src="./images/icons/logo.png" className="logo" />
          <div className="connection">
            <img src="./images/icons/connected.svg" className="connection__icon" />
            <p className="text text--very-small">{state.connected ? "Connected" : "Disconnected"}</p>
            {state[DBUS_PATHS.SETTINGS.SHOW_REMOTE_CONSOLE] && (
              <button className="remote-console-button text text--very-small" onClick={this.toggleRemoteConsole}>
                {state.currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
              </button>
            )}
          </div>
        </header>
        <main className={!state.connected ? "disconnected" : ""}>
          {(() => {
            switch (state.currentView) {
              case VIEWS.AMPERAGE_SELECTOR:
                return (
                  <ShoreInputLimitSelector
                    currentLimit={state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
                    maxLimit={state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]}
                    productId={state[DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID]}
                    onLimitSelected={this.handleShorePowerLimitSelected}
                  />
                )
                ca
              case VIEWS.REMOTE_CONSOLE:
                return (
                  <div className="remote-console__container">
                    <iframe className="remote-console" src={"http://" + host} />
                    <span className="text text--large remote-console__small_screen_info">
                      Open in a larger screen to view remote console.
                    </span>
                  </div>
                )
              case VIEWS.METRICS:
              default:
                return (
                  <div id="metrics-container">
                    <Battery
                      soc={state[DBUS_PATHS.BATTERY.SOC]}
                      state={state[DBUS_PATHS.BATTERY.STATE]}
                      voltage={state[DBUS_PATHS.BATTERY.VOLTAGE]}
                      current={state[DBUS_PATHS.BATTERY.CURRENT]}
                      power={state[DBUS_PATHS.BATTERY.POWER]}
                      timeToGo={state[DBUS_PATHS.BATTERY.TIME_TO_GO]}
                    />
                    <div className="multi-metric-container shore-power__container">
                      <ActiveSource
                        activeInput={state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_INPUT]}
                        settings={{
                          input0: state[DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1],
                          input1: state[DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2]
                        }}
                        current={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]
                        }}
                        voltage={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]
                        }}
                        power={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]
                        }}
                      />
                      <ShoreInputLimit
                        currentLimit={state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
                        isAdjustable={state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]}
                        setView={this.setView}
                      />
                    </div>
                    <InverterCharger
                      state={state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]}
                      activeMode={state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
                      isAdjustable={state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]}
                      onModeSelected={this.handleModeSelected}
                    />
                    <div className="multi-metric-container">
                      <AcLoads
                        current={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]
                        }}
                        voltage={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]
                        }}
                        power={{
                          phase1: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1],
                          phase2: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2],
                          phase3: state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]
                        }}
                      />
                      <DcLoads
                        batteryVoltage={state[DBUS_PATHS.BATTERY.VOLTAGE]}
                        power={state[DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]}
                      />
                    </div>
                  </div>
                )
            }
          })()}
        </main>
      </div>
    )
  }
}

render(<App />, document.body)
