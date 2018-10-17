import { h, render, Component } from "preact"
import metricsConfig from "./metricsConfig"
import VenusClient from "../service/index"

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
    "Ac/Grid/Voltage": "--",
    "Ac/Grid/Current": "--",
    "Ac/Grid/Power": "--",
    "Ac/Grid/CurrentLimit": "--",
    "System/State": "--",
    "System/Mode": "--",
    "Ac/Loads/Voltage": "--",
    "Ac/Loads/Current": "--",
    "Ac/Loads/Power": "--",
    "Dc/Loads/Current": "--",
    "Dc/Loads/Power": "--",
    "Dc/Battery/Soc": "--",
    "Dc/Battery/Voltage": "--",
    "Dc/Battery/Current": "--",
    "Dc/Battery/Power": "--",
    modeSelectionVisible: false,
    currentSelectionVisible: false,
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
      const metricName = metric.name
      this.setState({ [metricName]: formattedValue + metric.unit })
    }

    deviceInterface.onConnectionChanged = ({ connected }) => {
      this.setState({ connected })
    }

    this.setState({ deviceInterface })

    // Enable reload button for test devices
    document.getElementById("devReload").style.display = "block"
  }

  updateStateValue = (path, value) => {
    this.setState({ [path]: value })
  }

  render(props, state) {
    return (
      <main>
        <header>
          <div className={"connectionStatus " + (state.connected ? "connectionStatus--on" : "connectionStatus--off")} />
          {/* Element for test devices */}
          <div id="devReload" style="position: fixed; top: 5px; left: 5x;">
            <input type="button" value="Reload page" onClick={() => location.reload(true)} />
            <input type="button" value="Browser info" onClick={() => (window.location.href = "/browser-info.html")} />
          </div>
          <img src="images/logo-vic.svg" />
          <a href={"http://" + host} class="remoteBtn" type="button" target="_blank">
            Remote Console
          </a>
        </header>
        <CurrentSelector {...this.state} updateStateValue={this.updateStateValue} />
        <ModeSelector {...this.state} updateStateValue={this.updateStateValue} />
        <div className="container">
          <ShorePower {...this.state} updateStateValue={this.updateStateValue} />
          <MultiPlus {...this.state} updateStateValue={this.updateStateValue} />
          <AcLoads {...this.state} updateStateValue={this.updateStateValue} />
          <Battery {...this.state} updateStateValue={this.updateStateValue} />
          <DcLoads {...this.state} updateStateValue={this.updateStateValue} />
        </div>
      </main>
    )
  }
}

class CurrentSelector extends Component {
  setAmperage = value => {
    this.props.deviceInterface.write("/Ac/ActiveIn/CurrentLimit", value)
  }

  render(props, state) {
    const shoreVoltage = parseInt(props["Ac/Grid/Voltage"])
    const amperage = !shoreVoltage || shoreVoltage > 150 ? EUAmperage : USAmperage

    return (
      <div id="mySidenav" className={"sidenav " + (props.currentSelectionVisible ? "sidenav--visible" : "")}>
        <a href="#" class="closebtn" onClick={() => props.updateStateValue("currentSelectionVisible", false)}>
          &times;
        </a>
        <div id="inputLimitSelection" class="amps">
          <h4>Input Limit</h4>
          {amperage.map(currentValue => {
            return (
              <a href="#" onClick={() => this.setAmperage(currentValue)}>
                {currentValue + "A"}
              </a>
            )
          })}
        </div>
      </div>
    )
  }
}

class ModeSelector extends Component {
  setMode = mode => {
    if (mode === "on") {
      this.props.deviceInterface.write("/Mode", 3)
    } else if (mode === "off") {
      this.props.deviceInterface.write("/Mode", 4)
    } else if (mode === "charge") {
      this.props.deviceInterface.write("/Mode", 1)
    }
  }

  render(props, state) {
    return (
      <div id="myMultiPlus" className={"sidenav " + (props.modeSelectionVisible ? "sidenav--visible" : "")}>
        <a href="#" class="closebtn" onClick={() => props.updateStateValue("modeSelectionVisible", false)}>
          &times;
        </a>
        <div class="modeBtn">
          <h4>MultiPlus</h4>
          <a href="#" id="setModeOnButton" class="modeButton" onClick={() => this.setMode("on")}>
            ON
          </a>
          <a href="#" id="setModeOffButton" class="modeButton" onClick={() => this.setMode("off")}>
            OFF
          </a>
          <a href="#" id="setModeChargeOnlyButton" class="modeButton" onClick={() => this.setMode("charge")}>
            Charger only
          </a>
        </div>
      </div>
    )
  }
}

class Value extends Component {
  render(props, state) {
    return <span className={"value" + (props.connected ? "" : " stale")}>{props.value}</span>
  }
}

class ShorePower extends Component {
  render(props, state) {
    return (
      <div id="shorePowerContainer" class="g grid-33 shorePower">
        <p className="gridTitle">Shore Power</p>
        <img src="images/ico-shore.svg" />
        <span class="voltage">
          <Value value={props["Ac/Grid/Voltage"]} connected={props.connected} />
          <Value value={props["Ac/Grid/Current"]} connected={props.connected} />
          <Value value={props["Ac/Grid/Power"]} connected={props.connected} />
          <div class="mode bottomBtn" onClick={() => props.updateStateValue("currentSelectionVisible", true)}>
            <img src="images/ico-arrow-bot.png" class="bottomImgArrow" />
            Input limit:
            <Value value={props["Ac/Grid/CurrentLimit"]} connected={props.connected} />
          </div>
        </span>
      </div>
    )
  }
}

class MultiPlus extends Component {
  render(props, state) {
    return (
      <div class="g grid-33 multiPlus">
        <p className="gridTitle">MultiPlus</p>
        <img src="images/ico-multiPlus.png" />
        <span class="voltage">
          <Value value={props["System/State"]} connected={props.connected} />
          <div class="mode bottomBtn" onClick={() => props.updateStateValue("currentSelectionVisible", true)}>
            <img src="images/ico-arrow-bot.png" class="bottomImgArrow" />
            Mode:
            <Value value={props["System/Mode"]} connected={props.connected} />
          </div>
        </span>
      </div>
    )
  }
}

class AcLoads extends Component {
  render(props, state) {
    return (
      <div class="g grid-33 ACLoads">
        <p className="gridTitle">AC Loads</p>
        <img src="images/ico-ac.svg" />
        <span class="voltage">
          <Value value={props["Ac/Loads/Voltage"]} connected={props.connected} />
          <Value value={props["Ac/Loads/Current"]} connected={props.connected} />
          <Value value={props["Ac/Loads/Power"]} connected={props.connected} />
        </span>
      </div>
    )
  }
}

class DcLoads extends Component {
  render(props, state) {
    return (
      <div class="g grid-33 DCLoads">
        <p className="gridTitle">DC Loads</p>
        <img src="images/ico-dc.svg" />
        <span class="voltage">
          <Value value={props["Dc/Loads/Current"]} connected={props.connected} />
          <Value value={props["Dc/Loads/Power"]} connected={props.connected} />
        </span>
      </div>
    )
  }
}

class Battery extends Component {
  render(props, state) {
    return (
      <div id="batteryContainer" class="g grid-33 batteryDischarge">
        <p className="gridTitle">
          Battery
          <Value value={props["Dc/Battery/Soc"]} connected={props.connected} />
        </p>
        <div class="batteryProgress" />
        <span class="voltage">
          <Value value={props["Dc/Battery/Voltage"]} connected={props.connected} />
          <Value value={props["Dc/Battery/Current"]} connected={props.connected} />
          <Value value={props["Dc/Battery/Power"]} connected={props.connected} />
        </span>
      </div>
    )
  }
}

render(<App />, document.body)
