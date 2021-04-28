import React, { useEffect, useState } from "react"
import KVNRVLogo from "../../images/KVNRV-Logo.svg"
import LockIcon from "../../images/KVNRV-Logo.svg"
import RemoteIcon from "../../images/KVNRV-Logo.svg"

import './Header.scss'

type HeaderProps = {
  toggleDarkMode: Function
}

const timer = () => {
  return new Date();
}

const Header = (props: HeaderProps) => {

  const [time, setTime] = useState(timer());

  useEffect(() => {
    const t = setTimeout(() => {
      setTime(timer());
    }, 1000 * 10);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(t);
  });

  let dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return (
    <div className={"header"}>
      <div className={"header__left"}>
        <div className={"header__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"header__logo__image"}/>
          <span className={"header__logo__text"}>KVNRV</span>
        </div>

        <div className={"header__info"}>
          <div>Calvin Hendricks</div>
          <div>{ time.toLocaleString('nl-NL', dateFormat) }</div>
        </div>
      </div>

      <div className={"header__buttons"}>
        <div className={"header__buttons__lock"}>
          <button>
            <img src={LockIcon} alt={"Lock icon"}/>
            Lock changes
          </button>
        </div>

        <div className={"header__buttons__remote"}>
          <button>
            <img src={RemoteIcon} alt={"Remote Connection icon"}/>
            Remote connection
          </button>
        </div>

        <div className={"header__buttons__darkmode"}>
          <input type="checkbox" onClick={(e) => props.toggleDarkMode(e)} />
        </div>
      </div>
    </div>
  )
}


export default Header
