import { h, render, Component } from "preact"
const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]
const shoreVoltage = 110

class App extends Component {
  state = {
    "Ac/Grid/Voltage": "240V",
    "Ac/Grid/Current": "1.4A",
    "Ac/Grid/Power": "241W",
    "Ac/Grid/CurrentLimit": "10A",
    "System/State": "Absorbtion charging",
    "System/Mode": "ON",
    "Ac/Loads/Voltage": "240V",
    "Ac/Loads/Current": "0.3A",
    "Ac/Loads/Power": "21W",
    "Dc/Loads/Current": "3.4A",
    "Dc/Loads/Power": "220W",
    "Dc/Battery/Soc": "88%",
    "Dc/Battery/Voltage": "57.0V",
    "Dc/Battery/Current": "7.5A",
    "Dc/Battery/Power": "427W",
    modeSelectionVisible: false,
    currentSelectionVisible: false,
    amperage: shoreVoltage === undefined || shoreVoltage > 150 ? EUAmperage : USAmperage
  }

  updateStateValue = (path, value) => {
    console.log(path, value)
    this.setState({ [path]: value })
  }

  render(props, state) {
    return (
      <main>
        <header>
          <img src="images/logo-vic.svg" />
          <input class="remoteBtn" type="button" onClick="location.href='http://' + host;" value="Remote Console" />
          <a href="" />
          <div class="connectionStatus" />
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
    deviceInterface.write("/vebus/257/Ac/ActiveIn/CurrentLimit", value)
  }

  render(props, state) {
    return (
      <div id="mySidenav" className={"sidenav " + (props.currentSelectionVisible ? "sidenav--visible" : "")}>
        <a href="#" class="closebtn" onClick={() => props.updateStateValue("currentSelectionVisible", false)}>
          &times;
        </a>
        <div id="inputLimitSelection" class="amps">
          <h4>Input Limit</h4>
          {props.amperage.map(currentValue => {
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
      deviceInterface.write("/vebus/257/Mode", 3)
    } else if (mode === "off") {
      deviceInterface.write("/vebus/257/Mode", 4)
    } else if (mode === "charge") {
      deviceInterface.write("/vebus/257/Mode", 1)
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

class ShorePower extends Component {
  render(props, state) {
    return (
      <div id="shorePowerContainer" class="g grid-33 shorePower">
        <p className="gridTitle">Shore Power</p>
        <img src="images/ico-shore.svg" />
        <span class="voltage">
          <span>{props["Ac/Grid/Voltage"]}</span>
          <span class="leftMarginValue">{props["Ac/Grid/Current"]}</span>
          <span class="leftMarginValue">{props["Ac/Grid/Power"]}</span>
          <div class="mode bottomBtn" onClick={() => props.updateStateValue("currentSelectionVisible", true)}>
            <img src="images/ico-arrow-bot.png" class="bottomImgArrow" />
            <span>Input limit:</span>
            <span>{props["Ac/Grid/CurrentLimit"]}</span>
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
          <span>{props["System/State"]}</span>
          <div class="mode bottomBtn" onClick={() => props.updateStateValue("currentSelectionVisible", true)}>
            <img src="images/ico-arrow-bot.png" class="bottomImgArrow" />
            <span>Mode:</span>
            <span>{props["System/Mode"]}</span>
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
          <span>{props["Ac/Loads/Voltage"]}</span>
          <span class="leftMarginValue">{props["Ac/Loads/Current"]}</span>
          <span class="leftMarginValue">{props["Ac/Loads/Power"]}</span>
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
          <span>{props["Dc/Loads/Current"]}</span>
          <span class="leftMarginValue">{props["Dc/Loads/Power"]}</span>
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
          <span class="leftMarginValue">{props["Dc/Battery/Soc"]}</span>
        </p>
        <div class="batteryProgress" />
        <span class="voltage">
          <span>{props["Dc/Battery/Voltage"]}</span>
          <span class="leftMarginValue">{props["Dc/Battery/Current"]}</span>
          <span class="leftMarginValue">{props["Dc/Battery/Power"]}</span>
        </span>
      </div>
    )
  }
}

render(<App />, document.body)
