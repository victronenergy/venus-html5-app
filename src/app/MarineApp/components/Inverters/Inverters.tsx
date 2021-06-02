import React from "react"

import { useInverters, useVebus } from "../../../modules"

import Inverter from "./Inverter"
import ColumnContainer from "../ColumnContainer"

const Inverters = () => {
  const { inverters } = useInverters()
  const { instanceId } = useVebus()

  if (inverters || instanceId) {
    return (
      <>
        {inverters && inverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={false} />)}
        {instanceId && <Inverter key={instanceId} instanceId={instanceId} isVebusInverter={true} />}
      </>
    )
  } else {
    return <ColumnContainer />
  }
}

export default Inverters
