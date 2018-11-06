import { h, Component } from "preact"
import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../service/topics"
import NumericValue from "./NumericValue"

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

  activeSourceIcon = {
    [AC_SOURCE_TYPE.SHORE]: "./images/icons/shore-power.svg",
    [AC_SOURCE_TYPE.GRID]: "./images/icons/shore-power.svg",
    [AC_SOURCE_TYPE.GENERATOR]: "./images/icons/generator.svg",
    [AC_SOURCE_TYPE.NOT_IN_USE]: "./images/icons/shore-power.svg"
  }

  render(props, state) {
    const activeSource = getActiveSource(props)

    if (activeSource === undefined) {
      return <ActiveSourceMetric title={"..."} />
    }

    if (activeSource === null) {
      return <ActiveSourceMetric title={"Inverting"} icon="./images/icons/inverter.svg" />
    }

    return (
      <ActiveSourceMetric
        title={this.activeSourceLabel[activeSource]}
        icon={this.activeSourceIcon[activeSource]}
        voltage={props.voltage.phase1}
        current={props.current.phase1 + props.current.phase2 + props.current.phase3}
        power={props.power.phase1 + props.power.phase2 + props.power.phase3}
      />
    )
  }
}

class ActiveSourceMetric extends Component {
  render(props, state) {
    const hasValues = props.voltage || props.current || props.power
    return (
      <div className="metric metric--small">
        <img src={props.icon} className="metric__icon" />
        <div className={"metric__value-container" + (hasValues ? "" : " metric__value-container--centered")}>
          <p className="text text--medium">{props.title}</p>
          {hasValues && (
            <div className="metric__values">
              <NumericValue value={props.voltage} unit={"V"} />
              <NumericValue value={props.current} unit="A" precision={1} />
              <NumericValue value={props.power} unit="W" />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ActiveSource
