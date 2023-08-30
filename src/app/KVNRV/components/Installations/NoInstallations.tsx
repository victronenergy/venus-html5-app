import { useVrmStore } from "@victronenergy/mfd-modules"
import { Translate } from "react-i18nify"

export const NoInstallations = () => {
  const vrmStore = useVrmStore()

  return (
    <div className={"login__form"}>
      <div className={"login__form__error"}>
        <Translate value="remoteLogin.noInstallations" />
      </div>

      <button
        className={"login__form__button login"}
        type={"submit"}
        onClick={() => {
          vrmStore.logout()
        }}
      >
        <Translate value="remoteLogin.logOut" />
      </button>
    </div>
  )
}
