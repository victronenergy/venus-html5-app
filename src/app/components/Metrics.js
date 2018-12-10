import React from "react"
import Battery from "./Battery"
import ActiveSource from "./ActiveSource"
import ShoreInputLimit from "./ShoreInputLimit"
import InverterCharger from "./InverterCharger"
import AcLoads from "./AcLoads"
import DcLoads from "./DcLoads"
import Solar from "./Solar"
import Tanks from "./Tanks"

const solarFeatureEnabled = false
const tanksFeatureEnabled = false

export default props => {
  const { portalId, vebusInstanceId, isConnected } = props
  return (
    <div id="metrics-container">
      <Battery portalId={portalId} />
      <div className="multi-metric-container shore-power__container">
        <ActiveSource portalId={portalId} vebusInstanceId={vebusInstanceId} />
        <ShoreInputLimit
          portalId={portalId}
          vebusInstanceId={vebusInstanceId}
          connected={isConnected}
          onChangeShoreInputLimitClicked={props.onChangeShoreInputLimitClicked}
        />
      </div>
      <InverterCharger
        portalId={portalId}
        vebusInstanceId={vebusInstanceId}
        connected={isConnected}
        onModeSelected={props.onModeSelected}
      />
      <div className="multi-metric-container">
        <AcLoads portalId={portalId} vebusInstanceId={vebusInstanceId} />
        <DcLoads portalId={portalId} />
      </div>
      {solarFeatureEnabled && <Solar portalId={portalId} />}
      {tanksFeatureEnabled && <Tanks portalId={portalId} />}
    </div>
  )
}
