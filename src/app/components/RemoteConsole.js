import React from "react"

export default ({ onClickOutsideContainer, host }) => (
  <div className="remote-console__container" onClick={onClickOutsideContainer}>
    <iframe className="remote-console" src={"http://" + host} />
    <span className="text text--large remote-console__small_screen_info">
      Open in a larger screen to view remote console.
    </span>
  </div>
)
