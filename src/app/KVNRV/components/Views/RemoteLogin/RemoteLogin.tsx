import { FormEventHandler, useCallback, useEffect, useState } from "react"
import { useAppStore, useTheme, useVrmStore } from "@victronenergy/mfd-modules"
import { Installations, NoInstallations } from "../../Installations"
import { VRM_URL } from "../../../utils/constants"

import "./RemoteLogin.scss"

import KVNRVLogo from "../../../images/KVNRV-Logo.svg"
import ArrowLeftDark from "../../../images/ArrowLeft-Dark.svg"
import ArrowLeft from "../../../images/ArrowLeft.svg"
import Splash from "../../../images/Splash.svg"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"

const getVerificationModeTranslation = (verificationMode?: string) => {
  if (verificationMode === "sms") {
    return <Translate value="remoteLogin.smsVerification" />
  } else if (verificationMode === "mobile") {
    return <Translate value="remoteLogin.mobileVerification" />
  }
  return <Translate value="remoteLogin.2fa" />
}

export const RemoteLogin = observer(() => {
  const { darkMode } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<any>()
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const { token, verificationMode, sentVerification, loggedIn, siteId, installations } = vrmStore
  const [verificationToken, setVerificationToken] = useState("")
  const [loading, setLoading] = useState(false)

  const needsTFA = verificationMode && verificationMode !== "password"

  const updateInstanceDetailsCb = useCallback(async () => {
    try {
      setLoading(true)
      await vrmStore.updateInstanceDetails()
    } catch (_e) {
      // was not possible to update instance details
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // try to update instance details if already possible on first mount
  useEffect(() => {
    updateInstanceDetailsCb()
  }, [updateInstanceDetailsCb])

  const clearState = () => {
    setEmail("")
    setPassword("")
    setVerificationToken("")
  }

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      setError(null)
      setLoading(true)
      const loginResponse = await vrmStore.login(email, password, true, verificationToken)
      if (loginResponse.token) {
        clearState()
      }
      await vrmStore.updateInstanceDetails()
    } catch (e) {
      console.error(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    appStore.setRemote(false)
  }

  return (
    <div className={"login-page"}>
      <div className={"login__body"}>
        <div className={"login__logo"}>
          <img src={KVNRVLogo} alt={"KVNRV logo"} className={"login__logo__image"} />
          <span className={"login__logo__text"}>KVNRV</span>
        </div>
        {!token && (
          <>
            <form className={"login__form"} onSubmit={submitLogin}>
              {error && (
                <div className={"login__form__error"}>
                  {error?.message ?? <Translate value="remoteLogin.loginFailed" />}
                </div>
              )}
              {/* the verification code is sent only first time, so if it's not sent it means it was wrong */}
              {needsTFA && !token && !sentVerification && (
                <div className={"login__form__error"}>
                  <Translate value="remoteLogin.wrong2fa" />
                </div>
              )}
              <label className={"login__form__label"} htmlFor={"login-email"}>
                <Translate value="remoteLogin.email" />
              </label>
              <input
                type="email"
                id={"login-email"}
                className={`login__form__input ${error && !needsTFA ? "invalid" : ""}`}
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />

              <label className={"login__form__label"} htmlFor={"login-password"}>
                <Translate value="remoteLogin.password" />
              </label>
              <input
                type="password"
                id={"login-password"}
                className={`login__form__input ${error && !needsTFA ? "invalid" : ""}`}
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
              />

              {needsTFA && (
                <>
                  <label className={"login__form__label"} htmlFor={"login-tfa"}>
                    {getVerificationModeTranslation(verificationMode)}
                  </label>
                  <input
                    type="text"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id={"tfa"}
                    className={`login__form__input ${error ? "invalid" : ""}`}
                    value={verificationToken}
                    onInput={(e) => setVerificationToken(e.currentTarget.value)}
                  />
                </>
              )}

              <button className={"login__form__button login"} type={"submit"}>
                <Translate value="remoteLogin.logIn" />
              </button>
              <button className={"login__form__button go_back"} type={"button"} onClick={goBack}>
                <img
                  src={darkMode ? ArrowLeftDark : ArrowLeft}
                  alt={"Left arrow"}
                  className={"login__form__icon__go_back"}
                />
                <Translate value="remoteLogin.goBack" />
              </button>
            </form>

            <div className={"login__bottom"}>
              <a target={"_blank"} href={VRM_URL + "forgot-password"} rel="noreferrer">
                <Translate value="remoteLogin.forgotPassword" />
              </a>
            </div>
            <div className={"login__footer"}>
              <span>
                <Translate value="remoteLogin.registerMessage1" />{" "}
                <a target={"_blank"} href={VRM_URL + "register"} rel="noreferrer">
                  <Translate value="remoteLogin.registerMessage2" />
                </a>
              </span>
            </div>
          </>
        )}
        {token && !loading && !installations && <NoInstallations />}
        {(loggedIn || (!siteId && installations)) && <Installations />}
      </div>
      <div className={"login__splash"}>
        <img src={Splash} alt={"Splash"} className={"login__splash__image"} />
      </div>
    </div>
  )
})

export default RemoteLogin
