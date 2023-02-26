import { useState } from "react"
import Box from "../../../components/ui/Box"
import { DcLoadsState } from "@elninotech/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import { formatPower, formatValue } from "../../../utils/formatters"
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

const EnergyDC = ({ mode = "compact", dcLoads }: Props) => {
  const { power, voltage } = dcLoads

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles: StylesType = applyStyles(boxSize, styles)

  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

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
      getBoxSizeCallback={setBoxSize}
    >
      <div className="w-full h-full flex flex-col">
        <div className={classNames("text-victron-gray dark:text-white", activeStyles?.mainValue)}>
          {formatValue(power / voltage)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </div>
        <div className="w-full h-full flex content-end flex-wrap">
          <div className="w-full">
            <hr className="w-full h-1 border-victron-gray" />
            <div
              className={classNames("text-left text-victron-gray dark:text-victron-gray-dark", activeStyles?.subValue)}
            >
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
