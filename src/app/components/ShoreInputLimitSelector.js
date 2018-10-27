import { h, Component } from "preact"
import { DBUS_PATHS } from "../../config/dbusPaths"

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]

class ShoreInputLimitSelector extends Component {
  render(props, state) {
    // const shoreVoltage = parseInt(props.shoreVoltage)
    // const amperage = !shoreVoltage || shoreVoltage > 150 ? EUAmperage : USAmperage
    const amperage = USAmperage // TODO

    return (
      <div className="amperage-selector">
        {amperage.map(currentValue => {
          return (
            <button
              className={
                "selector-button selector-button__amperage text text--very-large" +
                (parseInt(props.currentLimit) == currentValue ? " selector-button--active" : "")
              }
              href="#"
              onClick={() => props.onLimitSelected(currentValue)}
            >
              {currentValue}
            </button>
          )
        })}
      </div>
    )
  }
}

export default ShoreInputLimitSelector
