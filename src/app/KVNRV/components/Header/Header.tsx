import { useEffect, useState } from "react"
import { appQuery, useAppService, useTheme, useVrmService, vrmQuery } from "../../../modules"
import KVNRVLogo from "../../images/KVNRV-Logo.svg"
import RemoteIcon from "../../images/RemoteIcon.svg"
import LogOutIcon from "../../images/LogOut.svg"

import "./Header.scss"
import { VIEWS } from "../../utils/constants"
import { useObservableState } from "observable-hooks"

const timer = () => {
  return new Date()
}

export const Header = () => {
  const [time, setTime] = useState(timer())
  const { darkMode, themeService } = useTheme()
  const appService = useAppService()
  const remote = useObservableState(appQuery.remote$)
  const loggedIn = useObservableState(vrmQuery.loggedIn$)
  const username = useObservableState(vrmQuery.username$)
  const vrmService = useVrmService()

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

  const handleRemoteSwitch = () => {
    appService.toggleRemote()
  }

  useEffect(() => {
    if (remote && !loggedIn) {
      appService.setPage(VIEWS.LOGIN)
    } else {
      appService.setPage(VIEWS.METRICS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, loggedIn])

  return (
    <div className={"header"}>
      <div className={"header__left"}>
        <div className={"header__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"header__logo__image"} />
          <span className={"header__logo__text"}>KVNRV</span>
        </div>

        <div className={"header__info"}>
          <div>{username && "Logged in as"}</div>
          <div>{username ?? "Not logged in"}</div>
        </div>

        <div className={"header__buttons"}>
          <>
            {loggedIn && (
              <button className={"header__buttons__logout"} onClick={() => vrmService.logout()}>
                <img src={LogOutIcon} className={"header__buttons__icon"} alt={"Logout icon"} />
              </button>
            )}
          </>
        </div>
      </div>

      <div className={"header__middle"}>
        <div className={"header__buttons"}>
          <div className={"header__buttons__remote-connection"} onClick={() => handleRemoteSwitch()}>
            <button className={"remote " + (remote ? "active" : "")}>Remote</button>
            <button className={"local " + (!remote ? "active" : "")}>Local</button>
          </div>
        </div>
      </div>

      <div className={"header__buttons"}>
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

        {!remote && (
          <button
            className={"header__buttons__remote-console"}
            onClick={() => appService.setPage(VIEWS.CONSOLE)}
            disabled={remote}
          >
            <img src={RemoteIcon} className={"header__buttons__icon"} alt={"Remote Console icon"} />
            <span className={"header__buttons__text"}>Remote console</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
