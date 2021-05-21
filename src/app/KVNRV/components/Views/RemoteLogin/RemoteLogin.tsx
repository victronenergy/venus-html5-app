import { useState } from "react"
import KVNRVLogo from "../../../images/KVNRV-Logo.svg"
import "./RemoteLogin.scss"

export const RemoteLogin = () => {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [remember, setRemember] = useState(true)

  return (
    <div className={"login-page"}>
      <div className={"login__body"}>
        <div className={"login__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"login__logo__image"} />
          <span className={"login__logo__text"}>KVNRV</span>
        </div>

        <div className={"login__form"}>
          <label className={"login__form__label"} htmlFor={"login-email"}>
            Email
          </label>
          <input
            type="email"
            id={"login-email"}
            className={"login__form__input"}
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />

          <label className={"login__form__label"} htmlFor={"login-password"}>
            Password
          </label>
          <input
            type="password"
            id={"login-password"}
            className={"login__form__input"}
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />

          <button className={"login__form__button"}>Log in</button>
        </div>

        <div className={"login__bottom"}>
          <div className={"login__bottom__remember"}>
            <input
              type={"checkbox"}
              id={"login-remember"}
              className={"login__checkbox"}
              checked={remember}
              onChange={(e) => setRemember(e.currentTarget.checked)}
            />
            <label htmlFor={"login-remember"}>Remember me</label>
          </div>

          <a href={"victronenergy.com"}>Forgot Passowrd?</a>
        </div>
        <div className={"login__footer"}>
          <span>
            Don't have an account yet? <a href={"victronenergy.com"}>Register your RV.</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RemoteLogin
