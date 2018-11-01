import { h, Component } from "preact"
import NumericValue from "./NumericValue"

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

export default DcLoads
