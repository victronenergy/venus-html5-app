import { h, render, Component } from "preact"
import metricsConfig from "../config/metricsConfig"
import { DBUS_PATHS } from "../config/dbusPaths"
import VenusClient from "../service/index"
import "../css/texts.scss"
import "../css/styles.scss"

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]
const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const mqttUrl = `mqtt://${host}:${port}`

class App extends Component {
  state = {
    [DBUS_PATHS.BATTERY.VOLTAGE]: "--",
    [DBUS_PATHS.BATTERY.CURRENT]: "--",
    [DBUS_PATHS.BATTERY.POWER]: "--",
    [DBUS_PATHS.BATTERY.SOC]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.VOLTAGE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.POWER]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.IS_CONNECTED]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]: "--",
    [DBUS_PATHS.INVERTER_CHARGER.AC_SOURCE]: "Ac Input Mode",
    currentLimitSelectorVisible: false,
    connected: false
  }

  componentDidMount = () => {
    const deviceInterface = new VenusClient(mqttUrl)
    deviceInterface.connect().then(() => {
      const dbusPaths = Object.keys(metricsConfig)
      deviceInterface.subscribe(dbusPaths)
    })

    deviceInterface.onMessage = ({ path, value }) => {
      console.log(path, value)
      const metric = metricsConfig[path]
      if (!metric) {
        console.error(`Metric not found for path ${path}`)
        return
      }

      const formattedValue = metric.formatter(value)
      this.setState({ [path]: formattedValue + metric.unit })
    }

    deviceInterface.onConnectionChanged = ({ connected }) => {
      this.setState({ connected })
    }

    this.setState({ deviceInterface })
  }

  toggleCurrentLimitSelector = () => {
    this.setState({ currentLimitSelectorVisible: !this.state.currentLimitSelectorVisible })
  }

  render(props, state) {
    return (
      <main>
        <div className="bg" />
        <header>
          <img src="./images/icons/logo.svg" className="logo" />
          <div className="connection">
            <img src="./images/icons/connected.svg" className="connection__icon" />
            <p className="text text--very-small">{this.state.connected ? "Connected" : "Disconnected"}</p>
            <a href={"http://" + host} className="remote-console text text--very-small" target="_blank">
              Remote Console
            </a>
          </div>
        </header>
        {state.currentLimitSelectorVisible ? (
          <ShoreInputLimitSelector
            toggle={this.state.toggleSelector}
            shoreVoltage={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]}
            deviceInterface={this.state.deviceInterface}
            toggle={this.toggleCurrentLimitSelector}
          />
        ) : (
          <div id="metrics-container">
            <div className="multi-metric-container">
              <AcInput
                acInput={this.state[DBUS_PATHS.INVERTER_CHARGER.AC_SOURCE]}
                voltage={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]}
                current={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT]}
                power={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER]}
                connected={this.state.connected}
              />
              <ShoreInputLimit
                currentLimit={this.state[DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]}
                toggle={this.toggleCurrentLimitSelector}
                connected={this.state.connected}
              />
            </div>
            <MultiPlus
              state={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]}
              mode={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
              connected={this.state.connected}
              activeMode={this.state[DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]}
              deviceInterface={this.state.deviceInterface}
            />
            <Battery
              soc={this.state[DBUS_PATHS.BATTERY.SOC]}
              voltage={this.state[DBUS_PATHS.BATTERY.VOLTAGE]}
              current={this.state[DBUS_PATHS.BATTERY.CURRENT]}
              power={this.state[DBUS_PATHS.BATTERY.POWER]}
              connected={this.state.connected}
            />
            <div className="multi-metric-container">
              <AcLoads
                voltage={this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.VOLTAGE]}
                current={this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT]}
                power={this.state[DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.POWER]}
                connected={this.state.connected}
              />
              <DcLoads
                current={this.state[DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT]}
                power={this.state[DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]}
                connected={this.state.connected}
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
            <Value value={props.voltage} connected={props.connected} />
            <Value value={props.current} connected={props.connected} />
            <Value value={props.power} connected={props.connected} />
          </div>
        </div>
      </div>
    )
  }
}

class ShoreInputLimit extends Component {
  render(props, state) {
    return (
      <div className="metric metric--small">
        <button className="selector-button selector-button" onclick={props.toggle}>
          <span className="selector-button__shore-input-limit text text--small">Select shore input limit:</span>
          <span className="text text--bold">{props.currentLimit}</span>
        </button>
      </div>
    )
  }
}

class ShoreInputLimitSelector extends Component {
  setAmperage = value => {
    this.props.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT, value)
    this.props.toggle()
  }

  render(props, state) {
    const shoreVoltage = parseInt(props.shoreVoltage)
    const amperage = !shoreVoltage || shoreVoltage > 150 ? EUAmperage : USAmperage

    return (
      <div className="amperage-selector">
        {amperage.map(currentValue => {
          return (
            <button
              className={
                "selector-button selector-button__amperage text text--large" +
                (parseInt(props.currentLimit) == currentValue ? " selector-button--active" : "")
              }
              href="#"
              onClick={() => this.setAmperage(currentValue)}
            >
              {currentValue}
            </button>
          )
        })}
      </div>
    )
  }
}

class MultiPlus extends Component {
  setMode = mode => {
    this.props.deviceInterface.write(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE, mode)
  }

  render(props, state) {
    return (
      <div className="metric">
        <div className="metric__container--left">
          <img src="./images/icons/multiplus.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">MultiPlus</p>
            <div className="metric__values">
              <p className="text">{props.state}</p>
            </div>
          </div>
        </div>
        <div className="metrics-selector">
          <button
            href="#"
            className={"selector-button text" + (props.activeMode == "ON" ? " selector-button--active" : "")}
            onClick={() => this.setMode(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATES.ON)}
          >
            On
          </button>
          <button
            href="#"
            className={"selector-button text" + (props.activeMode == "OFF" ? " selector-button--active" : "")}
            onClick={() => this.setMode(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATES.OFF)}
          >
            Off
          </button>
          <button
            href="#"
            className={"selector-button text" + (props.activeMode == "Charger only" ? " selector-button--active" : "")}
            onClick={() => this.setMode(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATES.CHARGER_ONLY)}
          >
            Charger only
          </button>
        </div>
      </div>
    )
  }
}

class Battery extends Component {
  render(props, state) {
    const chargingState = parseInt(props.current) > 0 ? "Charging" : "Draining"
    return (
      <div className="metric metric__battery">
        <div className="metric__container--left">
          <img src="./images/icons/battery.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Battery</p>
            <div className="metric__values">
              <Value value={props.voltage} connected={props.connected} />
              <Value value={props.current} connected={props.connected} />
              <Value value={props.power} connected={props.connected} />
            </div>
          </div>
        </div>
        <div className="metric__battery-level-container">
          <div className="text--bottom-align">
            <p className="text text--bold">{parseInt(props.soc)}</p>
            <p className="text text--very-small">% {chargingState}</p>
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
            <Value value={props.voltage} connected={props.connected} />
            <Value value={props.current} connected={props.connected} />
            <Value value={props.power} connected={props.connected} />
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
            <Value value={props.current} connected={props.connected} />
            <Value value={props.power} connected={props.connected} />
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.body)
