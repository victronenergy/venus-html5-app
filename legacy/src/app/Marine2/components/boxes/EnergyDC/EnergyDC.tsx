import React from "react"
import EnergyIcon from "../../../images/icons/energy.svg"
import Box from "../../ui/Box"
import { AppViews } from "../../../modules/AppViews"

const EnergyDC = ({ mode, className }: EnergyDCProps) => {
  if (mode === "compact") {
    return (
      <Box
        title={"DC Loads"}
        icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"DC Loads"} />}
        linkedView={AppViews.BOX_ENERGY_DC}
        className={className}
      >
        <>
          <div>DC Loads compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box
      title={"DC Loads"}
      icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"DC Loads"} />}
    >
      <>
        <div>DC Loads full content</div>
      </>
    </Box>
  )
}

interface EnergyDCProps {
  mode?: string
  className?: string
}

export default EnergyDC
