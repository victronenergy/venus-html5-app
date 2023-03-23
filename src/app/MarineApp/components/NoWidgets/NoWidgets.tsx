import CompassImg from "../../images/compass.png"
import { Translate } from "react-i18nify"
import "./NoWidgets.scss"
import { useVisibleWidgetsStore } from "app/MarineApp/modules"
import { observer } from "mobx-react"

export const NoWidgets = observer(() => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  return (
    <>
      {visibleWidgetsStore.noVisibleElements && (
        <div className="no-widgets-container">
          <img src={CompassImg} alt="compass" />
          <h3>
            <Translate value="noWidgets.title" />
          </h3>
          <h4>
            <Translate value="noWidgets.subtitle" />
          </h4>
        </div>
      )}
    </>
  )
})
