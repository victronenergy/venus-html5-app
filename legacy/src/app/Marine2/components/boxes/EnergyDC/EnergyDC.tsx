import React from "react"
import EnergyIcon from "../../../images/icons/energy.svg"
import Box from "../../ui/Box"
import { RouterPath } from "../../../routes/paths"

const EnergyDC = ({ mode }: EnergyDCProps) => {
  if (mode === "compact") {
    return (
      <Box
        title={"DC Loads"}
        icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"DC Loads"} />}
        onExpandHref={RouterPath.BOX_ENERGY_DC}
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
}

export default EnergyDC
