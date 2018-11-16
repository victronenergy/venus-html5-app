import { h, Component } from "preact"
import { VIEWS } from "../../config/enums"

class ShoreInputLimit extends Component {
  render(props, state) {
    if (!props.isAdjustable) {
      return (
        <div className="metric metric--small">
          <div className="metric__shore-input-limit--not-adjustable">
            <span className="text text--small">Shore input limit:&nbsp;</span>
            <span className="text text--bold">{props.currentLimit}</span>
          </div>
        </div>
      )
    }

    return (
      <div className="metric metric--small metric--shore-input-limit">
        <button className="selector-button text" onclick={() => props.setView(VIEWS.AMPERAGE_SELECTOR)}>
          <span className="text--small">Select shore input limit:&nbsp;</span>
          <span className="text--bold">{props.currentLimit}</span>
        </button>
      </div>
    )
  }
}

export default ShoreInputLimit
