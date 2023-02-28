import React from "react"
import { useActiveInValues, useActiveSource } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import Box from "../../../components/ui/Box"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { formatValue, formatPower } from "../../../utils/formatters"
import { translate } from "react-i18nify"

const EnergyShore = ({ mode = "compact", inputId }: Props) => {
  const { current, power } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  if (mode === "compact") {
    return (
      <div className="flex items-center justify-between text-sm md-m:text-base lg-l:text-lg">
        <div className="flex">
          <ShorePowerIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7 text-black dark:text-white"}
          />
          <div className="flex flex-col pl-2 md:pl-3">
            <p>{translate("boxes.shorePower")}</p>
            {unplugged && (
              <small className={"text-sm text-victron-gray dark:text-victron-gray-dark"}>
                {translate("common.unplugged")}
              </small>
            )}
          </div>
        </div>
        {!unplugged ? (
          (phases ?? 1) === 1 ? (
            <p>
              {formatValue(current[0])}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          ) : (
            <p>
              {formatPower(totalPower)}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">W</span>
            </p>
          )
        ) : (
          <div>
            <p className="hidden text-sm md:block">{translate("common.unplugged")}</p>
            <p className="md:hidden">
              --<span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <Box
      title={translate("boxes.shorePower")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ShorePowerIcon className={"w-5 text-black dark:text-white"} />}
    >
      <div className="w-full h-full flex flex-col text-2xl md-m:text-3xl lg-l:text-4xl">
        {unplugged && <p className="text-victron-gray dark:text-white">{translate("common.unplugged")}</p>}
        {!unplugged &&
          ((phases ?? 1) === 1 ? (
            <div className="text-victron-gray dark:text-white">
              {formatValue(current[0])}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </div>
          ) : (
            <div className="text-victron-gray dark:text-white">
              {formatValue(totalPower)}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">W</span>
            </div>
          ))}

        <div className="w-full h-full flex content-end flex-wrap">
          <div className="w-full">
            <hr className="w-full h-1 border-victron-gray" />
            <div className="text-left text-base md-m:text-lg lg-l:text-xl text-victron-gray dark:text-victron-gray-dark">
              {formatPower(totalPower)}
              <span className="p-0.5 text-victron-gray">W</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

interface Props {
  inputId: number
  mode?: "compact" | "full"
}

export default observer(EnergyShore)
