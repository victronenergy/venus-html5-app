import Charger from "./Charger"
import { ChargerInstanceId, useChargers } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

const Chargers = observer(() => {
  const { chargers } = useChargers()

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.CHARGERS, visible: !!chargers.length })

  return <>{chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} chargerId={charger} />)}</>
})

export default Chargers
