import React from "react"
import Box from "../../../components/ui/Box"
import { PvChargerState } from "@elninotech/mfd-modules"
import SolarIcon from "../../../images/icons/solar.svg"
import { formatPower, formatValue } from "../../../utils/formatters"
import { translate } from "react-i18nify"

const EnergySolar = ({ mode = "compact", pvCharger }: Props) => {
  const { current, power } = pvCharger

  if (mode === "compact") {
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="flex">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <SolarIcon className={"w-7 text-black dark:text-white"} />
          <p className="text-base md:text-xl lg:text-2xl pl-2 md:pl-3">{translate("boxes.solar")}</p>
        </div>
        <p className="text-base md:text-xl lg:text-2xl">
          {formatValue(current)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </p>
      </div>
    )
  }

  return (
    <Box
      title={translate("boxes.solar")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<SolarIcon className={"w-5 text-black dark:text-white"} />}
    >
      <div className="w-full h-full flex flex-col">
        <div className="text-5xl text-victron-gray dark:text-white md-m:text-6xl">
          {formatValue(current)}
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
  pvCharger: PvChargerState
  mode?: "compact" | "full"
}

export default EnergySolar
