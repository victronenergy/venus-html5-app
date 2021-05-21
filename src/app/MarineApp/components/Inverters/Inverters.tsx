import React from "react"

import { useInverters } from "../../../modules"

import Inverter from "./Inverter"
import ColumnContainer from "../ColumnContainer"

const Inverters = () => {
  const { systemInverters, vebusInverters } = useInverters()

  if (systemInverters && vebusInverters) {
    const systemInverterIds = Object.values(systemInverters)
    const vebusInverterIds = Object.values(vebusInverters)
    return (
      <ColumnContainer>
        {systemInverterIds.concat(vebusInverterIds).map((id) => (
          <Inverter key={id} isVebusInverter={vebusInverterIds.includes(id)} />
        ))}
      </ColumnContainer>
    )
  } else {
    return <ColumnContainer />
  }
}

export default Inverters
