import React from "react"
import EnergyIcon from "../../../images/icons/energy.svg"
import Box from "../../ui/Box"
import { RouterPath } from "../../../routes/paths"

const EnergyAC = ({ mode, className }: EnergyACProps) => {
  if (mode === "compact") {
    return (
      <Box
        title={"AC Loads"}
        icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"AC Loads"} />}
        onExpandHref={RouterPath.BOX_ENERGY_AC}
        className={className}
      >
        <>
          <div>AC Loads compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box
      title={"AC Loads"}
      icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"AC Loads"} />}
    >
      <>
        <div>AC Loads full content</div>
      </>
    </Box>
  )
}

interface EnergyACProps {
  mode?: string
  className?: string
}

export default EnergyAC
