import { translate, Translate } from "react-i18nify"

import "./RemoteConsole.scss"

const RemoteConsole = ({ onClickOutsideContainer, host }) => (
  <div className="remote-console__container" onClick={onClickOutsideContainer}>
    <iframe className="remote-console" src={"http://" + host} title={translate("header.remoteConsole")} />
    <div className="text text--large remote-console__small_screen_info">
      <Translate value="header.remoteMessage" />
    </div>
  </div>
)

export default RemoteConsole
