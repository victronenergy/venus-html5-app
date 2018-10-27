import { h, Component } from "preact"
import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../service/topics"
import { formatNumber } from "../formatters"
import Value from "./Value"

const getActiveSource = ({ activeInput, settings }) => {
  let activeSource
  switch (activeInput) {
    case ACTIVE_INPUT.INPUT_0:
      activeSource = settings.input0
      break
    case ACTIVE_INPUT.INPUT_1:
      activeSource = settings.input1
      break
    case ACTIVE_INPUT.NONE:
      activeSource = null
    default:
      break
  }
  return activeSource
}

class ActiveSource extends Component {
  activeSourceLabel = {
    [AC_SOURCE_TYPE.SHORE]: "Shore Power",
    [AC_SOURCE_TYPE.GRID]: "Grid Input",
    [AC_SOURCE_TYPE.GENERATOR]: "Generator",
    [AC_SOURCE_TYPE.NOT_IN_USE]: "Invalid Configuration" // You cannot have a source that isn't configured as active!
  }

  render(props, state) {
    const activeSource = getActiveSource(props)

    if (activeSource === undefined) {
      return <ActiveSourceMetric title={"..."} />
    }

    if (activeSource === null) {
      return <ActiveSourceMetric title={"Inverting"} />
    }

    return (
      <ActiveSourceMetric
        title={this.activeSourceLabel[activeSource]}
        voltage={props.voltage.phase1}
        current={props.current.phase1 + props.current.phase2 + props.current.phase3}
        power={props.power.phase1 + props.power.phase2 + props.power.phase3}
      />
    )
  }
}

class ActiveSourceMetric extends Component {
  render(props, state) {
    return (
      <div className="metric metric--small">
        <img src="./images/icons/shore-power.svg" className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">{props.title}</p>
          <div className="metric__values">
            <Value value={props.voltage} unit="V" />
            <Value value={props.current} unit="A" precision={1} />
            <Value value={props.power} unit="W" />
          </div>
        </div>
      </div>
    )
  }
}

export default ActiveSource
