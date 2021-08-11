import Charger from "./Charger"
import { ChargerInstanceId, useChargers } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "../MetricsContext/MetricsContext"

const Chargers = observer(() => {
  const { chargers } = useChargers()

  // for Metrics Context
  useVisibilityNotifier({ widgetName: "Chargers", visible: !!chargers.length })

  return <>{chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} chargerId={charger} />)}</>
})

export default Chargers
