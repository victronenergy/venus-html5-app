import React from "react"
import Box from "../../../components/ui/Box"
import WindIcon from "../../../images/icons/wind.svg"
import { useWindGenerator } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"

const EnergyWind = ({ mode = "compact", windGenerator, showInstance }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)
  const instance = showInstance ? ` [${windGenerator}]` : ""
  const power = current * voltage

  if (mode === "compact") {
    return (
      <p>
        {translate("boxes.windGenerator")}
        {instance}: {current || current === 0 ? Math.round(current) : "--"}A
      </p>
    )
  }

  return (
    <Box
      title={translate("boxes.windGenerator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<WindIcon className={"w-6 text-black dark:text-white"} />}
    >
      <>
        <p>{Math.round(current)}A</p>
        <p>{Math.round(power)}W</p>
      </>
    </Box>
  )
}

interface Props {
  windGenerator: number
  showInstance: boolean
  mode?: "compact" | "full"
}

export default observer(EnergyWind)
