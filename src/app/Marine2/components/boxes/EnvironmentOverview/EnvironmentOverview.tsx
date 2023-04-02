import { observer } from "mobx-react-lite"
import { useTemperatures, useTemperature, TemperatureInstanceId, useHumidity } from "@elninotech/mfd-modules"
import { useEffect, useState, Fragment } from "react"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import { AppViews } from "../../../modules/AppViews"
import Box from "../../ui/Box"
import TemperatureData from "./TemperatureData"
import HumidityData from "./HumidityData"
import ValueOverview from "../../ui/ValueOverview"
import ThermometerIcon from "../../../images/icons/thermometer.svg"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"

interface Props {
  mode?: "compact" | "full"
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const EnvironmentOverview = ({ mode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures } = useTemperatures()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  useVisibilityNotifier({ widgetName: BoxTypes.ENVIRONMENT, visible: !!(temperatures && temperatures.length) })

  const temperatureComponents = temperatures.map((temperatureId: TemperatureInstanceId, i: number) => (
    <TemperatureData key={`temperature-${temperatureId}`} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const humidityComponents = temperatures.map((temperatureId: TemperatureInstanceId, i: number) => (
    <HumidityData key={`humidity-${temperatureId}`} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const components = temperatureComponents.concat(humidityComponents)

  if (mode === "compact") {
    return (
      <Box
        title={"Environment"}
        /* todo: fix types for svg */
        /* @ts-ignore */
        linkedView={AppViews.BOX_ENVIRONMENT_OVERVIEW}
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
