import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import "./BlackWater.scss"
import { NotAvailable } from "../NotAvailable"

export const BlackWater = () => {

  return (
    <div className="">
      <Card title={'Black Water'} icon={undefined} size={SIZE_SMALL}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default BlackWater
