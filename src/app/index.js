import { h, render, Component } from "preact"
import metricsConfig from "../config/metricsConfig"
import { DBUS_PATHS } from "../config/dbusPaths"
import VenusClient from "../service/index"
import "../css/texts.scss"
import "../css/styles.scss"

import ActiveSource from "./components/ActiveSource"
import ShoreInputLimitSelector from "./components/ShoreInputLimitSelector"
import { SYSTEM_MODE } from "../service/topics"
import NumericValue from "./components/NumericValue"

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

    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: null,
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
      this.setState({ [path]: metric.unit ? formattedValue + metric.unit : formattedValue })
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
            <a href={"http://" + host} className="remote-console text text--very-small">
              Remote Console
            </a>
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
            <MultiPlus
              state={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]}
              activeMode={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
              isAdjustable={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]}
              onModeSelected={this.handleModeSelected}
            />
            <Battery
              soc={this.state[DBUS_PATHS.BATTERY.SOC]}
              voltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
              current={this.state[DBUS_PATHS.BATTERY.CURRENT]}
              power={this.state[DBUS_PATHS.BATTERY.POWER]}
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

class Value extends Component {
  render(props, state) {
    return <p className="value text">{props.value}</p>
  }
}

class AcInput extends Component {
  render(props, state) {
    return (
      <div className="metric metric--small">
        <img src="./images/icons/shore-power.svg" className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">{props.acInput}</p>
          <div className="metric__values">
            <Value value={props.voltage} />
            <Value value={props.current} />
            <Value value={props.power} />
          </div>
        </div>
      </div>
    )
  }
}

class ShoreInputLimit extends Component {
  render(props, state) {
    if (!props.isAdjustable) {
      return (
        <div className="metric metric--small">
          <button disabled className="selector-button selector-button__shore-input-limit selector-button--disabled">
            <span className="text text--small">Shore input limit:</span>
            <span className="text text--bold">{props.currentLimit}</span>
          </button>
        </div>
      )
    }

    return (
      <div className="metric metric--small">
        <button className="selector-button selector-button__shore-input-limit" onclick={props.onSelectShoreLimitClick}>
          <span className="text text--small">Select shore input limit:</span>
          <span className="text text--bold">{props.currentLimit}</span>
        </button>
      </div>
    )
  }
}

class MultiPlus extends Component {
  render(props, state) {
    return (
      <div className="metric metric__container">
        <div className="metric__container--left">
          <img src="./images/icons/multiplus.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Inverter/charger</p>
            <div className="metric__values">
              <p className="text">{props.state}</p>
            </div>
          </div>
        </div>
        {props.isAdjustable ? (
          <div className="metrics-selector">
            <button
              className={"selector-button text" + (props.activeMode == "ON" ? " selector-button--active" : "")}
              onClick={() => props.onModeSelected(SYSTEM_MODE.ON)}
            >
              <span>On</span>
            </button>
            <button
              className={"selector-button text" + (props.activeMode == "OFF" ? " selector-button--active" : "")}
              onClick={() => props.onModeSelected(SYSTEM_MODE.OFF)}
            >
              <span>Off</span>
            </button>
            <button
              className={
                "selector-button text" + (props.activeMode == "Charger only" ? " selector-button--active" : "")
              }
              onClick={() => props.onModeSelected(SYSTEM_MODE.CHARGER_ONLY)}
            >
              <span>Charger only</span>
            </button>
            {/*// TODO Should we add a button for inverter only as well?*/}
          </div>
        ) : (
          <div className="metrics-selector">
            <button
              disabled
              className={
                "selector-button selector-button--disabled  text" +
                (props.activeMode == "ON" ? " selector-button--active" : "")
              }
            >
              On
            </button>
            <button
              disabled
              className={
                "selector-button selector-button--disabled text" +
                (props.activeMode == "OFF" ? " selector-button--active" : "")
              }
            >
              Off
            </button>
            <button
              disabled
              className={
                "selector-button selector-button--disabled text" +
                (props.activeMode == "Charger only" ? " selector-button--active" : "")
              }
            >
              Charger only
            </button>
            {/*// TODO Should we add a button for inverter only as well?*/}
          </div>
        )}
      </div>
    )
  }
}

class Battery extends Component {
  render(props, state) {
    let chargingState
    if (props.current === null) {
      chargingState = ""
    } else {
      chargingState = props.current > 0 ? "% Charging" : "% Draining"
    }

    return (
      <div className="metric metric__container metric__battery">
        <div className="metric__container--left">
          <img src="./images/icons/battery.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Battery</p>
            <div className="metric__values">
              <NumericValue value={props.voltage} unit="V" />
              <NumericValue value={props.current} unit="A" precision={1} />
              <NumericValue value={props.power} unit="W" />
            </div>
          </div>
        </div>
        <div className="metric__battery-level-container">
          <div className="text--bottom-align">
            <p className="text text--bold">{props.soc ? props.soc : ""}</p>
            <p className="text text--very-small">{chargingState}</p>
          </div>
        </div>
      </div>
    )
  }
}

class AcLoads extends Component {
  render(props, state) {
    return (
      <div className="metric metric--small">
        <img src="./images/icons/ac.svg" className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">AC Loads</p>
          <div className="metric__values">
            <NumericValue value={props.voltage.phase1} unit="V" />
            <NumericValue
              value={props.current.phase1 + props.current.phase2 + props.current.phase3}
              unit="A"
              precision={1}
            />
            <NumericValue value={props.power.phase1 + props.power.phase2 + props.power.phase3} unit={"W"} />
          </div>
        </div>
      </div>
    )
  }
}

class DcLoads extends Component {
  render(props, state) {
    return (
      <div className="metric metric--small">
        <img src="./images/icons/dc.svg" className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">DC Loads</p>
          <div className="metric__values">
            <NumericValue value={props.power / props.batteryVoltage} unit="A" precision={1} />
            <NumericValue value={props.power} unit="W" />
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.body)
