import { observer } from "mobx-react-lite"
import { useTemperatures, TemperatureInstanceId } from "@elninotech/mfd-modules"
import { useState } from "react"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import { AppViews } from "../../../modules/AppViews"
import Box from "../../ui/Box"
import TemperatureData from "./TemperatureData"
import HumidityData from "./HumidityData"
import PressureData from "./PressureData"
import EnvironmentIcon from "../../../images/icons/environment.svg"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { translate } from "react-i18nify"

interface Props {
  mode?: "compact" | "full"
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

function isBoxVisible(components: JSX.Element[]): boolean {
  return components.some((component) => {
    return component.props._store && component.props._store.validated
  })
}

const EnvironmentOverview = ({ mode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures } = useTemperatures()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const temperatureComponents = temperatures.map((temperatureId: TemperatureInstanceId, i: number) => (
    <TemperatureData key={`temperature-${temperatureId}`} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const humidityComponents = temperatures.map((temperatureId: TemperatureInstanceId, i: number) => (
    <HumidityData key={`humidity-${temperatureId}`} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const pressureComponents = temperatures.map((temperatureId: TemperatureInstanceId, i: number) => (
    <PressureData key={`pressure-${temperatureId}`} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const components = [...temperatureComponents, ...humidityComponents, ...pressureComponents]

  useVisibilityNotifier({ widgetName: BoxTypes.ENVIRONMENT, visible: isBoxVisible(components) })

  if (mode === "compact") {
    return (
      <Box
        title={translate("boxes.environment")}
        /* todo: fix types for svg */
        linkedView={AppViews.BOX_ENVIRONMENT_OVERVIEW}
        /* @ts-ignore */
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
      childClassName={"p-2"}
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
