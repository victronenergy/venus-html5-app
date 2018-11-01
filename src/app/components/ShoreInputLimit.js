import { h, Component } from "preact"

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
      <div className="metric metric--small">
        <button className="selector-button selector-button__shore-input-limit" onclick={props.onSelectShoreLimitClick}>
          <span className="text text--small">Select shore input limit:&nbsp;</span>
          <span className="text text--bold">{props.currentLimit}</span>
        </button>
      </div>
    )
  }
}

export default ShoreInputLimit
