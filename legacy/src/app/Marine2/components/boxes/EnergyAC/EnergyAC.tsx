import React from "react"
import EnergyIcon from "../../../images/icons/energy.svg"
import Box from "../../ui/Box"

const EnergyAC = ({ mode }: EnergyACProps) => {
  if (mode === "compact") {
    return (
      <Box
        title={"AC Loads"}
        icon={<img src={EnergyIcon} className={"w-6 text-black dark:text-white"} alt={"AC Loads"} />}
        onExpandHref={`/box/energy-ac`}
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
}

export default EnergyAC
