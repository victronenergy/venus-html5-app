import React from "react"

import './RemoteConsole.scss'

const RemoteConsole = ({ onClickOutsideContainer, host }) => (
  <div className="remote-console__container" onClick={onClickOutsideContainer}>
    <iframe className="remote-console" src={"http://" + host} title="Remote Console" />
    <div className="text text--large remote-console__small_screen_info">
      Open in a larger screen to view remote console.
    </div>
  </div>
)

export default RemoteConsole;
