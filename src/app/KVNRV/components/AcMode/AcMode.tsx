import React  from "react"

import { Card, SIZE_BIG } from "../Card"
import { NotAvailable } from "../NotAvailable"


export const AcMode = () => {
  return (
    <div className="">
      <Card title={'AC Mode'} icon={undefined} size={SIZE_BIG}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default AcMode
