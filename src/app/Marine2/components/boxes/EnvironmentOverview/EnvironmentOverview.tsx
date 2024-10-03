import { observer } from "mobx-react-lite"
import { useTemperatures, TemperatureState } from "@victronenergy/mfd-modules"
import { useState } from "react"
import { useVisibilityNotifier } from "../../../modules"
import Box from "../../ui/Box"
import TemperatureData from "./TemperatureData"
import HumidityData from "./HumidityData"
import PressureData from "./PressureData"
import { ReactComponent as EnvironmentIcon } from "../../../images/icons/environment.svg"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { translate } from "react-i18nify"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { BOX_TYPES } from "../../../utils/constants/generic"
import { ISize } from "@m2Types/generic/size"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const EnvironmentOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures: sensors } = useTemperatures()
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  let temperatureComponents = (sensors.filter((sensor) => sensor.temperature !== undefined) || []).map(
    (sensor: TemperatureState) => (
      <TemperatureData
        key={"temperature" + sensor.instance}
        dataId={sensor.instance}
        componentMode={componentMode}
        boxSize={boxSize}
      />
    )
  )

  let humidityComponents = (sensors.filter((sensor) => sensor.humidity !== undefined) || []).map(
    (sensor: TemperatureState) => (
      <HumidityData
        key={"humidity" + sensor.instance}
        dataId={sensor.instance}
        componentMode={componentMode}
        boxSize={boxSize}
      />
    )
  )

  let pressureComponents = (sensors.filter((sensor) => sensor.pressure !== undefined) || []).map(
    (sensor: TemperatureState) => (
      <PressureData
        key={"pressure" + sensor.instance}
        dataId={sensor.instance}
        componentMode={componentMode}
        boxSize={boxSize}
      />
    )
  )

  const components = [...temperatureComponents, ...humidityComponents, ...pressureComponents] as JSX.Element[]

  const hasValidData = components.length > 0

  useVisibilityNotifier({ widgetName: BOX_TYPES.ENVIRONMENT, isVisible: hasValidData })

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.environment")}
        icon={<EnvironmentIcon className={"w-4"} />}
        withPagination={true}
        paginationOrientation={"vertical"}
        getBoxSizeCallback={setBoxSize}
      >
        {components}
      </Box>
    )
  }

  return (
    <GridPaginator
      childClassName={"p-1"}
      perPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {components}
    </GridPaginator>
  )
}

export default observer(EnvironmentOverview)
