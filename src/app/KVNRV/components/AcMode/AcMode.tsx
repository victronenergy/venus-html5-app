import React  from "react"

import { Card, SIZE_BIG } from "../Card"
import { NotAvailable } from "../NotAvailable"
import SettingsIcon from "../../images/SettingsIcon.svg"
import { CommonProps } from "../Views/Metrics"


export const AcMode = () => {
  return (
    <div className="">
      <Card title={'AC Mode'} icon={SettingsIcon} size={SIZE_BIG}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default AcMode
