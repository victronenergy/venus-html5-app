import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import "./WasteWater.scss"
import { NotAvailable } from "../NotAvailable"

export const WasteWater = () => {

  return (
    <div className="">
      <Card title={'Waste Water'} icon={undefined} size={SIZE_SMALL}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default WasteWater
