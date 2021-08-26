import { translate, Translate } from "react-i18nify"

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
      title={translate("header.remoteConsole")}
      src={"http://" + host}
      onLoad={() => document.getElementById("remote-console")!.focus()}
    />
    <div className="text text--large remote-console__small_screen_info">
      <Translate value="header.remoteMessage" />
    </div>
  </div>
)

export default RemoteConsole
