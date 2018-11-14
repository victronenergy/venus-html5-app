import { h, Component } from "preact"
import Logger from "../../logging/logger"

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]

class ShoreInputLimitSelector extends Component {
  /**
   * - Mask the Product id with `0xFF00`
   * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
   * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
   */
  getSuggestedAmperageValuesList(productId) {
    const result = productId & 0xff00
    if (result === 0x1900 || result === 0x2600) {
      return EUAmperage
    } else if (result === 0x2000 || result === 0x2700) {
      return USAmperage
    } else {
      Logger.warn(`Could not retrieve amperage US/EU for product id ${productId}`)
      return USAmperage
    }
  }

  render(props, state) {
    const maxLimit = props.maxLimit || 100
    const amperageList = this.getSuggestedAmperageValuesList(props.productId).filter(value => {
      return value <= maxLimit
    })

    return (
      <div className="amperage-selector__container">
        <div className="amperage-selector">
          <div className="text text--large text--center amperage-selector__description">Select shore input limit</div>
          {amperageList
            .map(currentValue => {
              return (
                <button
                  className={
                    "selector-button selector-button__amperage text text--very-large" +
                    (parseInt(props.currentLimit) == currentValue ? " selector-button--active" : "")
                  }
                  href="#"
                  onClick={() => props.onLimitSelected(currentValue)}
                >
                  {currentValue}A
                </button>
              )
            })
            // Add these to "cheat" the flexbox and allow center alignment of selector buttons
            // AND left alignment to the last row of buttons if multilined
            .concat(
              amperageList.map(() => {
                return <div className="empty" />
              })
            )}
        </div>
      </div>
    )
  }
}

export default ShoreInputLimitSelector
