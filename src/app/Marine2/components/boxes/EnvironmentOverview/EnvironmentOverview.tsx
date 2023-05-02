import { observer } from "mobx-react-lite"
import { useTemperatures, TemperatureInstanceId } from "@elninotech/mfd-modules"
import { useState, createContext } from "react"
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

export const VisibleComponentsContext = createContext({ passVisibility: (id: number, visible: boolean) => {} })

const EnvironmentOverview = ({ mode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures } = useTemperatures()
  const [visibleElements, setVisibleElements] = useState({})
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const passVisibility = (id: number, visible: boolean) => {
    setVisibleElements((prev) => ({ ...prev, [id]: visible }))
  }

  let temperatureComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <TemperatureData key={temperatureId} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  let humidityComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <HumidityData key={temperatureId} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  let pressureComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <PressureData key={temperatureId} dataId={temperatureId} mode={mode} boxSize={boxSize} />
  ))

  const components = [...temperatureComponents, ...humidityComponents, ...pressureComponents] as JSX.Element[]

  useVisibilityNotifier({ widgetName: BoxTypes.ENVIRONMENT, visible: Object.values(visibleElements).includes(true) })

  if (mode === "compact") {
    return (
      <VisibleComponentsContext.Provider value={{ passVisibility }}>
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
      </VisibleComponentsContext.Provider>
    )
  }

  return (
    <VisibleComponentsContext.Provider value={{ passVisibility }}>
      <GridPaginator
        childClassName={"p-2"}
        perPage={4}
        orientation={"horizontal"}
        pageSelectorPropsSetter={pageSelectorPropsSetter}
        flow={window.innerWidth > window.innerHeight ? "row" : "col"}
      >
        {components}
      </GridPaginator>
    </VisibleComponentsContext.Provider>
  )
}

export default observer(EnvironmentOverview)
