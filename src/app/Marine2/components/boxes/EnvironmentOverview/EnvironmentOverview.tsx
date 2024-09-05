import { observer } from "mobx-react-lite"
import { useTemperatures, TemperatureInstanceId } from "@victronenergy/mfd-modules"
import { useState, createContext, useCallback } from "react"
import { useVisibilityNotifier } from "../../../modules"
import Box from "../../ui/Box"
import TemperatureData from "./TemperatureData"
import HumidityData from "./HumidityData"
import PressureData from "./PressureData"
import EnvironmentIcon from "../../../images/icons/environment.svg"
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

export const VisibleComponentsContext = createContext({
  passVisibility: (id: number, type: SensorInformationType, visible: boolean) => {},
})

type SensorInformationType = "humidity" | "pressure" | "temperature"

const EnvironmentOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { temperatures: sensors } = useTemperatures()
  const [visibleElements, setVisibleElements] = useState({})
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  const passVisibility = useCallback((id: number, type: SensorInformationType, visible: boolean) => {
    setVisibleElements((prev: any) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: visible,
      },
    }))
  }, [])

  let temperatureComponents = (sensors || []).map((temperatureId: TemperatureInstanceId) => (
    <TemperatureData
      key={"temperature" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  let humidityComponents = (sensors || []).map((temperatureId: TemperatureInstanceId) => (
    <HumidityData
      key={"humidity" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  let pressureComponents = (sensors || []).map((temperatureId: TemperatureInstanceId) => (
    <PressureData
      key={"pressure" + temperatureId}
      dataId={temperatureId}
      componentMode={componentMode}
      boxSize={boxSize}
    />
  ))

  const components = [...temperatureComponents, ...humidityComponents, ...pressureComponents] as JSX.Element[]
  const sensorHasData: boolean = Object.values(visibleElements).some(
    (sensor: any) => sensor.temperature || sensor.humidity || sensor.pressure
  )

  const hasValidData = sensorHasData

  useVisibilityNotifier({ widgetName: BOX_TYPES.ENVIRONMENT, isVisible: hasValidData })

  if (componentMode === "compact") {
    return (
      <VisibleComponentsContext.Provider value={{ passVisibility }}>
        <Box
          title={translate("boxes.environment")}
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
