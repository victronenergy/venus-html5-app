import React from "react"

import { BigTank } from "./BigTank"
import { SmallTank } from "./SmallTank"
import { Conf, TANKS_CONF } from "../../utils/constants"
import { TankInstanceId } from "../../../modules/Tanks/Tanks.store"

export interface TankProps {
  tankId?: TankInstanceId
  conf: Conf
}

export const Tanks = React.memo(() => {
  return (
    <div className="col-span-4">
      <BigTank tankId={1} conf={TANKS_CONF.FRESH_WATER} />

      <div className="row">
        <SmallTank tankId={2} conf={TANKS_CONF.GRAY_WATER} />
        <SmallTank tankId={5} conf={TANKS_CONF.BLACK_WATER} />
      </div>
    </div>
  )
})

export default Tanks
