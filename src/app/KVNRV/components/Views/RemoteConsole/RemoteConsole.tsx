import React from "react"

import "./RemoteConsole.scss"

type RemoteConsoleProps = {
  onClickOutsideContainer: Function
  host: string
}

const RemoteConsole = ({ onClickOutsideContainer, host }: RemoteConsoleProps) => (
  <div className="remote-console__container" onClick={() => onClickOutsideContainer()}>
    <iframe
      id="remote-console"
      className="remote-console"
      title="Remote Console"
      src={"http://" + host}
      onLoad={() => document.getElementById("remote-console")!.focus()}
    />
    <div className="text text--large remote-console__small_screen_info">
      Open in a larger screen to view remote console.
    </div>
  </div>
)

export default RemoteConsole
