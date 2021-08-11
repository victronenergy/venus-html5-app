import { useContext } from "react"
import { MetricsContext } from "../MetricsContext"
import CompassImg from "../../images/compass.png"
import { Translate } from "react-i18nify"
import "./NoWidgets.scss"

export const NoWidgets = () => {
  const { elementsVisible } = useContext(MetricsContext)
  console.log({ elementsVisible })
  return (
    <>
      {!elementsVisible && (
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
}
