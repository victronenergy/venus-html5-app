import React from "react"

import Charger from "./Charger"
import { ChargerInstanceId, useChargers } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"

const Chargers = observer(() => {
  const { chargers } = useChargers()

  return <>{chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} chargerId={charger} />)}</>
})

export default Chargers
