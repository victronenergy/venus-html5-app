import React from "react"
import Battery from "./Battery"
import ActiveSource from "./ActiveSource"
import ShoreInputLimit from "./ShoreInputLimit"
import InverterCharger from "./InverterCharger"
import AcLoads from "./AcLoads"
import DcLoads from "./DcLoads"
import Solar from "./Solar"

const solarFeatureEnabled = false

export default props => {
  const { portalId, vebusInstanceId, isConnected } = props
  return (
    <div id="metrics-container">
      <Battery portalId={portalId} />
      <ActiveSource portalId={portalId} vebusInstanceId={vebusInstanceId} />
      <ShoreInputLimit
        portalId={portalId}
        vebusInstanceId={vebusInstanceId}
        connected={isConnected}
        onChangeShoreInputLimitClicked={props.onChangeShoreInputLimitClicked}
      />
      <InverterCharger
        portalId={portalId}
        vebusInstanceId={vebusInstanceId}
        connected={isConnected}
        onModeSelected={props.onModeSelected}
      />
      <AcLoads portalId={portalId} vebusInstanceId={vebusInstanceId} />
      <DcLoads portalId={portalId} />
      {solarFeatureEnabled && <Solar portalId={portalId} />}
    </div>
  )
}
