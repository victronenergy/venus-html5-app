import { h, Component } from "preact"
import { SYSTEM_MODE } from "../../service/topics"

class InverterCharger extends Component {
  render(props, state) {
    return (
      <div className="metric metric__container inverter-charger">
        <div className="metric__container--left">
          <img src="./images/icons/multiplus.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Inverter/charger</p>
            <div className="metric__values">
              <p className="text text--smaller">{props.state}</p>
            </div>
          </div>
        </div>
        <div className="inverter-charger__mode-selector">
          <button
            disabled={!props.isAdjustable}
            className={"selector-button text" + (props.activeMode == "ON" ? " selector-button--active" : "")}
            onClick={() => props.onModeSelected(SYSTEM_MODE.ON)}
          >
            <span>On</span>
          </button>
          <button
            disabled={!props.isAdjustable}
            className={"selector-button text" + (props.activeMode == "OFF" ? " selector-button--active" : "")}
            onClick={() => props.onModeSelected(SYSTEM_MODE.OFF)}
          >
            <span>Off</span>
          </button>
          <button
            disabled={!props.isAdjustable}
            className={"selector-button text" + (props.activeMode == "Charger only" ? " selector-button--active" : "")}
            onClick={() => props.onModeSelected(SYSTEM_MODE.CHARGER_ONLY)}
          >
            <span>Charger only</span>
          </button>
          {/*// TODO Should we add a button for inverter only as well?*/}
        </div>
      </div>
    )
  }
}

export default InverterCharger
