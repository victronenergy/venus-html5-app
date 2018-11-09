import { h, Component } from "preact"
import { SYSTEM_MODE } from "../../service/topics"

class InverterCharger extends Component {
  render(props, state) {
    return (
      <div className="metric metric__container">
        <div className="metric__container--left">
          <img src="./images/icons/multiplus.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Inverter/charger</p>
            <div className="metric__values">
              <p className="text text--smaller">{props.state}</p>
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

export default InverterCharger
