import React from "react"

import { CommonProps } from "../Views/Metrics"
import { BigTank } from "./BigTank"
import { SmallTank } from "./SmallTank"
import { Conf, TANKS_CONF } from "../../utils/constants"
import { useTanks } from "../../../modules"
import { TankInstanceId } from "../../../modules/Tanks/Tanks.store"

export interface TankProps extends CommonProps {
  tankId?: TankInstanceId
  conf: Conf
}

export const Tanks = React.memo((props: CommonProps) => {
  const { tanks } = useTanks()

  if (!(tanks && tanks[0])) {
    return <div></div>
  }

  return (
    <div className="col-span-4">
      <BigTank tankId={tanks[0][0]} conf={TANKS_CONF.FRESH_WATER} {...props} />

      <div className="row">
        <SmallTank tankId={tanks[0][1]} conf={TANKS_CONF.GRAY_WATER} {...props} />
        <SmallTank tankId={tanks[0][2]} conf={TANKS_CONF.BLACK_WATER} {...props} />
      </div>
    </div>
  )
})

export default Tanks
