import React from "react"
import { useInverters } from "../../../modules/Inverters/Inverters.provider"
import Inverter from "./Inverter"

const Inverters = () => {
  const { systemInverters, vebusInverters } = useInverters()

  const systemInverterIds = Object.values(systemInverters)
  const vebusInverterIds = Object.values(vebusInverters)
  return (
    <div>
      {systemInverterIds.concat(vebusInverterIds).map((id) => (
        <Inverter key={id} isVebusInverter={vebusInverterIds.includes(id)} />
      ))}
    </div>
  )
}

export default Inverters
