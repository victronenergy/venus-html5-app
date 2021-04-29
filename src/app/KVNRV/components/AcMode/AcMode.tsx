import React  from "react"

import { Card, SIZE_BIG } from "../Card"
import SettingsIcon from "../../images/SettingsIcon.svg"
import { CommonProps } from "../Views/Metrics"
import './AcMode.scss'


type AcModeState = {
  mode: number
  inputLimit: number
}

class AcMode extends React.Component<CommonProps, AcModeState>{

  render() {
    return (
      <div className="">
        <Card title={'AC Mode'} icon={SettingsIcon} size={SIZE_BIG}>
          <div className="">
            Input limit
            {}
          </div>
        </Card>
      </div>
    )
  }
}

export default AcMode
