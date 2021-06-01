import React from "react"

import Charger from "./Charger"
import { useChargers } from "../../../modules"

const Chargers = () => {
  const { chargers } = useChargers()

  return <>{chargers && chargers.map((charger: number) => <Charger key={charger} chargerId={charger} />)}</>
}

export default Chargers
