import { useObservableState } from "observable-hooks"
import { useAppService, useVrmService, vrmQuery } from "@victronenergy/mfd-modules"
import "./Installations.scss"
import { VIEWS } from "../../utils/constants"

export const Installations = () => {
  const installations = useObservableState(vrmQuery.installations$)
  const vrmService = useVrmService()
  const appService = useAppService()

  const selectInstallation = (id: number) => {
    vrmService.setActiveInstallation(id)
    appService.setPage(VIEWS.METRICS)
  }

  return (
    <div className={"installations"}>
      <div className={"installations__title"}>Choose an installation</div>
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
}
