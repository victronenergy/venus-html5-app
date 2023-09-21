import { observer } from "mobx-react-lite"
import { useTemperatures, TemperatureInstanceId } from "@victronenergy/mfd-modules"
import { useState, createContext, useCallback } from "react"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import Box from "../../ui/Box"
import TemperatureData from "./TemperatureData"
import HumidityData from "./HumidityData"
import PressureData from "./PressureData"
import EnvironmentIcon from "../../../images/icons/environment.svg"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { translate } from "react-i18nify"
import { ComponentMode } from "@m2Types/generic/component-mode"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export const VisibleComponentsContext = createContext({
  passVisibility: (id: number, visible: boolean) => {},
})

const EnvironmentOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures } = useTemperatures()
  const [visibleElements, setVisibleElements] = useState({})
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const passVisibility = useCallback((id: number, visible: boolean) => {
    setVisibleElements((prev) => ({ ...prev, [id]: visible }))
  }, [])

  let temperatureComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <TemperatureData
      key={"temperature" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  let humidityComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <HumidityData
      key={"humidity" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  let pressureComponents = (temperatures || []).map((temperatureId: TemperatureInstanceId) => (
    <PressureData
      key={"pressure" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  const components = [...temperatureComponents, ...humidityComponents, ...pressureComponents] as JSX.Element[]

  useVisibilityNotifier({ widgetName: BoxTypes.ENVIRONMENT, visible: Object.values(visibleElements).includes(true) })

  if (componentMode === "compact") {
    return (
      <VisibleComponentsContext.Provider value={{ passVisibility }}>
        <Box
          title={translate("boxes.environment")}
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
        childClassName={"p-1"}
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
