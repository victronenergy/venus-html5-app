import { useEffect, useState } from "react"
import { useAppService, useTheme } from "../../../modules"
import KVNRVLogo from "../../images/KVNRV-Logo.svg"
import RemoteIcon from "../../images/RemoteIcon.svg"

import "./Header.scss"
import { VIEWS } from "../../utils/constants"

const timer = () => {
  return new Date()
}

export const Header = () => {
  const [time, setTime] = useState(timer())
  const { darkMode, themeService } = useTheme()
  const appService = useAppService()

  useEffect(() => {
    const t = setTimeout(() => {
      setTime(timer())
    }, 1000 * 10)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(t)
  })

  let dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  const [remote, setRemote] = useState(false)

  const handleRemoteSwitch = () => {
    setRemote(!remote)
  }

  useEffect(() => {
    if (remote) {
      appService.setPage(VIEWS.LOGIN)
    } else {
      appService.setPage(VIEWS.METRICS)
    }
  }, [remote])

  return (
    <div className={"header"}>
      <div className={"header__left"}>
        <div className={"header__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"header__logo__image"} />
          <span className={"header__logo__text"}>KVNRV</span>
        </div>

        <div className={"header__info"}>
          <div>Calvin Hendricks</div>
          <div>{time.toLocaleString("en-US", dateFormat)}</div>
        </div>
      </div>

      <div className={"header__buttons"}>
        <div className={"header__buttons__remote-connection"} onClick={() => handleRemoteSwitch()}>
          <button className={"remote " + (remote ? "active" : "")}>Remote</button>
          <button className={"local " + (!remote ? "active" : "")}>Local</button>
        </div>

        <div className={"header__buttons__darkmode"}>
          <label htmlFor="header__buttons__darkmode__input" className="header__buttons__darkmode__switch">
            <input
              type="checkbox"
              checked={darkMode ?? true}
              onChange={(e) => themeService.setTheme(!darkMode)}
              id="header__buttons__darkmode__input"
            />
            <span className="header__buttons__darkmode__slider" />
          </label>
        </div>

        <button className={"header__buttons__remote-console"} onClick={() => appService.setPage(VIEWS.CONSOLE)}>
          <img src={RemoteIcon} className={"header__buttons__icon"} alt={"Remote Console icon"} />
          <span className={"header__buttons__text"}>Remote console</span>
        </button>
      </div>
    </div>
  )
}

export default Header
