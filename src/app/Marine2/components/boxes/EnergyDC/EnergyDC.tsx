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
      <div className="flex flex-row justify-between items-center text-sm md-m:text-base lg-l:text-lg">
        <div className="flex">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <DCIcon className={"w-7 text-black dark:text-white"} />
          <p className="pl-2 md:pl-3">{translate("boxes.dcLoads")}</p>
        </div>
        <p>
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
        <div className="text-victron-gray dark:text-white text-2xl md-m:text-3xl lg-l:text-4xl">
          {formatValue(power / voltage)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </div>
        <div className="w-full h-full flex content-end flex-wrap">
          <div className="w-full">
            <hr className="w-full h-1 border-victron-gray" />
            <div className="text-left text-base md-m:text-lg lg-l:text-xl text-victron-gray dark:text-victron-gray-dark">
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
