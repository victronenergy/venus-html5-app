import React from "react"

export default props => (
  <div className="remote-console__container" onClick={props.onClickOutsideContainer}>
    <iframe className="remote-console" src={"http://" + props.host} />
    <span className="text text--large remote-console__small_screen_info">
      Open in a larger screen to view remote console.
    </span>
  </div>
)
