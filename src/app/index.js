import { h, render, Component } from "preact"
import metricsConfig from "../config/metricsConfig"
import { DBUS_PATHS } from "../config/dbusPaths"
import VenusClient from "../service/index"
import "../css/texts.scss"
import "../css/styles.scss"

import ActiveSource from "./components/ActiveSource"
import ShoreInputLimit from "./components/ShoreInputLimit"
import ShoreInputLimitSelector from "./components/ShoreInputLimitSelector"
import InverterCharger from "./components/InverterCharger"
import Battery from "./components/Battery"
import AcLoads from "./components/AcLoads"
import DcLoads from "./components/DcLoads"

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

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
    currentLimitSelectorVisible: false,
    connected: false
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
        console.warn(`Received message for topic you're not listening to: ${path}`)
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

  toggleCurrentLimitSelector = () => {
    this.setState({ currentLimitSelectorVisible: !this.state.currentLimitSelectorVisible })
  }

  handleShorePowerLimitSelected = limit => {
    this.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT, limit)
    this.toggleCurrentLimitSelector()
  }

  handleModeSelected = mode => {
    this.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE, mode)
  }

  render(props, state) {
    return (
      <main className={!this.state.connected ? "disconnected" : ""}>
        <div className="bg fixed--full-size" />
        <header>
          <img src="./images/icons/logo.png" className="logo" />
          <div className="connection">
            <img src="./images/icons/connected.svg" className="connection__icon" />
            <p className="text text--very-small">{this.state.connected ? "Connected" : "Disconnected"}</p>
          </div>
        </header>
        {state.currentLimitSelectorVisible ? (
          <ShoreInputLimitSelector
            currentLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
            maxLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]}
            productId={this.state[DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID]}
            onLimitSelected={this.handleShorePowerLimitSelected}
          />
        ) : (
          <div id="metrics-container">
            <Battery
              soc={this.state[DBUS_PATHS.BATTERY.SOC]}
              state={this.state[DBUS_PATHS.BATTERY.STATE]}
              voltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
              current={this.state[DBUS_PATHS.BATTERY.CURRENT]}
              power={this.state[DBUS_PATHS.BATTERY.POWER]}
            />
            <div className="multi-metric-container">
              <ActiveSource
                activeInput={this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_INPUT]}
                settings={{
                  input0: this.state[DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1],
                  input1: this.state[DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2]
                }}
                current={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]
                }}
                voltage={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]
                }}
                power={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]
                }}
              />
              <ShoreInputLimit
                currentLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
                isAdjustable={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]}
                onSelectShoreLimitClick={this.toggleCurrentLimitSelector}
              />
            </div>
            <InverterCharger
              state={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]}
              activeMode={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
              isAdjustable={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]}
              onModeSelected={this.handleModeSelected}
            />
            <div className="multi-metric-container">
              <AcLoads
                current={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]
                }}
                voltage={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]
                }}
                power={{
                  phase1: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1],
                  phase2: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2],
                  phase3: this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]
                }}
              />
              <DcLoads
                batteryVoltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
                power={this.state[DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]}
              />
            </div>
          </div>
        )}
      </main>
    )
  }
}

render(<App />, document.body)
