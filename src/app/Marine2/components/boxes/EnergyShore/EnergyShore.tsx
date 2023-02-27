import React, { useEffect, useState } from "react"
import { useActiveInValues, useActiveSource } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import Box from "../../../components/ui/Box"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { formatValue, formatPower } from "../../../utils/formatters"
import { translate } from "react-i18nify"
import { applyStyles, StylesType } from "app/Marine2/utils/media"
import classNames from "classnames"

const styles: StylesType = {
  "sm-s": {
    mainValue: "text-2xl",
    subValue: "text-base",
  },
  "md-s": {
    mainValue: "text-3xl",
    subValue: "text-lg",
  },
}

const compactStyles: StylesType = {
  "sm-s": {
    name: "text-sm",
    namePadding: "pl-2",
    description: "text-xs",
    value: "text-base",
  },
  "md-s": {
    name: "text-base",
    namePadding: "pl-3",
    description: "text-sm",
    value: "text-lg",
  },
}

const EnergyShore = ({ mode = "compact", inputId, compactBoxSize }: Props) => {
  const { current, power } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles: StylesType = applyStyles(boxSize, styles)
  let compactActiveStyles: StylesType = {}
  if (compactBoxSize) {
    compactActiveStyles = applyStyles(compactBoxSize, compactStyles)
  }
  if (mode === "compact") {
    return (
      <div className={classNames("flex items-center justify-between", compactActiveStyles?.name)}>
        <div className="flex items-center">
          <ShorePowerIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7 text-black dark:text-white"}
          />
          <div className={classNames("flex flex-col", compactActiveStyles?.namePadding)}>
            <p>{translate("boxes.shorePower")}</p>
            {unplugged && (
              <small
                className={classNames(
                  "text-victron-gray dark:text-victron-gray-dark",
                  compactActiveStyles?.description
                )}
              >
                {translate("common.unplugged")}
              </small>
            )}
          </div>
        </div>
        {!unplugged ? (
          (phases ?? 1) === 1 ? (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatValue(current[0])}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          ) : (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatPower(totalPower)}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">W</span>
            </p>
          )
        ) : (
          <div className={classNames(compactActiveStyles?.value)}>
            <p className="hidden md:block">{translate("common.unplugged")}</p>
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
      getBoxSizeCallback={setBoxSize}
    >
      <div className={classNames("w-full h-full flex flex-col", activeStyles?.mainValue)}>
        {unplugged && (
          <p>
            --<span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
          </p>
        )}
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
            <div
              className={classNames("text-left text-victron-gray dark:text-victron-gray-dark", activeStyles?.subValue)}
            >
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
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyShore)
