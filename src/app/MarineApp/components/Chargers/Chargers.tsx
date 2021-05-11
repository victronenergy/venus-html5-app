import React from "react"

import Charger from "./Charger"
import { useChargers } from "../../../modules/Chargers/Chargers.provider"

const Chargers = () => {
  const { chargers } = useChargers()
  return (
    <div>
      {chargers.map((charger) => (
        <Charger key={charger} chargerId={charger} />
      ))}
    </div>
  )
}

export default Chargers
