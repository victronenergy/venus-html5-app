import React from "react"

import Charger from "./Charger"
import { useChargers } from "../../../modules"

const Chargers = () => {
  const { chargers } = useChargers()

  return <div>{chargers && chargers.map((charger: number) => <Charger key={charger} chargerId={charger} />)}</div>
}

export default Chargers
