import { useAppStore, useVrmStore } from "@victronenergy/mfd-modules"
import "./Installations.scss"
import { VIEWS } from "../../utils/constants"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"

export const Installations = observer(() => {
  const vrmStore = useVrmStore()
  const { installations } = vrmStore
  const appStore = useAppStore()

  const selectInstallation = (id: number) => {
    vrmStore.setActiveInstallation(id)
    appStore.setPage(VIEWS.METRICS)
  }

  return (
    <div className={"installations"}>
      <div className={"installations__title"}>
        <Translate value="installations.title" />
      </div>
      <div className={"installations__list"}>
        {installations?.map((installation) => (
          <button
            className={"installations__list__item"}
            key={installation.idSite}
            onClick={() => selectInstallation(installation.idSite)}
          >
            {installation.name}
          </button>
        ))}
      </div>
    </div>
  )
})
