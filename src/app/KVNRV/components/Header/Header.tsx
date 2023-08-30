import { useEffect, useRef } from "react"
import { useApp, useTheme, useVrmStore } from "@victronenergy/mfd-modules"
import { VIEWS } from "../../utils/constants"

import "./Header.scss"

import KVNRVLogo from "../../images/KVNRV-Logo.svg"
import RemoteConsoleIcon from "../../images/RemoteConsoleIcon.svg"
import LogOutIcon from "../../images/LogOut.svg"
import LightThemeIcon from "../../images/LightThemeIcon.svg"
import DarkThemeIcon from "../../images/DarkThemeIcon.svg"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { ModalVersionInfo } from "../ModalVersionInfo"

export const Header = observer(() => {
  const { darkMode, themeStore } = useTheme()
  const appStore = useApp()
  const remote = appStore.remote
  const vrmStore = useVrmStore()
  const { loggedIn, username, siteId } = vrmStore
  const modalVersionInfoRef = useRef<any>()

  const handleRemoteSwitch = () => {
    window.location.replace(remote ? `http://venus.local/app` : `https://kvnrv-9ca32.web.app/app`)
    appStore.toggleRemote()
  }

  useEffect(() => {
    if (remote && (!loggedIn || !siteId)) {
      appStore.setPage(VIEWS.LOGIN)
    } else {
      appStore.setPage(VIEWS.METRICS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, loggedIn, siteId])

  return (
    <>
      <div className={"header"}>
        <div className={"header__left"}>
          <div
            className={"header__logo"}
            onClick={() => {
              modalVersionInfoRef.current.open()
            }}
          >
            <img src={KVNRVLogo} alt={"KVNRV logo"} className={"header__logo__image"} />
            <span className={"header__logo__text"}>KVNRV</span>
          </div>

          <div className={"header__info"}>
            {loggedIn && (
              <>
                <div>{username && <Translate value="header.loggedIn" />}</div>
                <div>{username ?? <Translate value="header.notLoggedIn" />}</div>
              </>
            )}
          </div>

          <div className={"header__buttons"}>
            <>
              {loggedIn && (
                <button className={"header__buttons__logout"} onClick={() => vrmStore.logout()}>
                  <img src={LogOutIcon} className={"header__buttons__icon"} alt={"Logout icon"} />
                </button>
              )}
            </>
          </div>
        </div>

        <div className={"header__buttons"}>
          <div className={"header__buttons__remote-connection"} onClick={() => handleRemoteSwitch()}>
            <button className={"remote " + (remote ? "active" : "")}>
              <Translate value="header.remote" />
            </button>
            <button className={"local " + (!remote ? "active" : "")}>
              <Translate value="header.local" />
            </button>
          </div>
          <div className={"header__buttons__darkmode"}>
            <label htmlFor="header__buttons__darkmode__input" className="header__buttons__darkmode__switch">
              <input
                type="checkbox"
                checked={darkMode ?? true}
                onChange={(e) => themeStore.setDarkMode(!darkMode)}
                id="header__buttons__darkmode__input"
              />
              <span className="header__buttons__darkmode__slider">
                <img
                  src={darkMode ? DarkThemeIcon : LightThemeIcon}
                  className={"header__buttons__darkmode__slider__img"}
                  alt={"Dark mode slider"}
                />
              </span>
            </label>
          </div>

          {!remote && (
            <button
              className={"header__buttons__remote-console"}
              onClick={() => appStore.setPage(VIEWS.CONSOLE)}
              disabled={remote}
            >
              <img src={RemoteConsoleIcon} className={"header__buttons__icon"} alt={"Remote Console icon"} />
              <span className={"header__buttons__text"}>
                <Translate value="header.remoteConsole" />
              </span>
            </button>
          )}
        </div>
      </div>
      <ModalVersionInfo ref={modalVersionInfoRef} />
    </>
  )
})

export default Header
