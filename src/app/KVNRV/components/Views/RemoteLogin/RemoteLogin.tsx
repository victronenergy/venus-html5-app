import { FormEventHandler, useState } from "react"
import KVNRVLogo from "../../../images/KVNRV-Logo.svg"
import "./RemoteLogin.scss"
import { useAppService, useVrmService } from "../../../../modules"
import { VIEWS } from "../../../utils/constants"

export const RemoteLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const vrmService = useVrmService()
  const appService = useAppService()

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      await vrmService.login(email, password)
      await vrmService.updateInstanceDetails()

      appService.setPage(VIEWS.METRICS)
    } catch (e) {
      console.error(e)
      // TODO: Display error to user
    }
  }

  return (
    <div className={"login-page"}>
      <div className={"login__body"}>
        <div className={"login__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"login__logo__image"} />
          <span className={"login__logo__text"}>KVNRV</span>
        </div>

        <form className={"login__form"} onSubmit={submitLogin}>
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

          <button className={"login__form__button"} type={"submit"}>Log in</button>
        </form>

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

          <a href={"victronenergy.com"}>Forgot Password?</a>
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
