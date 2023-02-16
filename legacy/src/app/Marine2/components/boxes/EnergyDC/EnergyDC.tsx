import React from "react"
import Box from "../../../components/ui/Box"
import { DcLoadsState } from "@elninotech/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import { formatPower, formatValue } from "../../../utils/formatters"
import { translate } from "react-i18nify"

const EnergyDC = ({ mode = "compact", dcLoads }: Props) => {
  const { power, voltage } = dcLoads

  if (mode === "compact") {
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="flex">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <DCIcon className={"w-7 text-black dark:text-white"} />
          <p className="text-base md:text-xl lg:text-2xl pl-2 md:pl-3">{translate("boxes.dcLoads")}</p>
        </div>
        <p className="text-base md:text-xl lg:text-2xl">
          {formatValue(power / voltage)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </p>
      </div>
    )
  }

  return (
    <Box
      title={translate("boxes.dcLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<DCIcon className={"w-5 text-black dark:text-white"} />}
    >
      <div className="w-full h-full flex flex-col">
        <div className="text-5xl text-victron-gray dark:text-white md-m:text-6xl">
          {formatValue(power / voltage)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </div>
        <div className="w-full h-full flex content-end flex-wrap">
          <div className="w-full">
            <hr className="w-full h-1 border-victron-gray" />
            <div className="text-left text-base text-victron-gray dark:text-victron-gray-dark md-m:text-2xl">
              {formatPower(power)}
              <span className="p-0.5 text-victron-gray">W</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

interface Props {
  dcLoads: DcLoadsState
  mode?: "compact" | "full"
}

export default EnergyDC
