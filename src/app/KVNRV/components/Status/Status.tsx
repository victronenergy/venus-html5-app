import React  from "react"

import { Card, SIZE_BIG } from "../Card"
import { NotAvailable } from "../NotAvailable"
import "./Status.scss"

export const Status = () => {
  return (
    <div className="metrics__status">
      <Card title={'Status'} icon={undefined} size={SIZE_BIG}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default Status
