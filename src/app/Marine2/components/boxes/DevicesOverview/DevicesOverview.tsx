import Box from "../../ui/Box"
import DevicesIcon from "../../../images/icons/devices.svg"
import { AppViews } from "../../../modules/AppViews"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import {
  ChargerInstanceId,
  useChargers,
  useGeneratorFp,
  useGeneratorRelay,
  useInverters,
  useVebus,
} from "@elninotech/mfd-modules"
import Charger from "../Charger"
import Inverter from "../Inverter"
import GeneratorFp from "../GeneratorFp"
import GeneratorRelays from "../GeneratorRelays"
import InverterCharger from "../InverterCharger"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import { withErrorBoundary } from "react-error-boundary"
import { appErrorBoundaryProps } from "../../ui/Error/appErrorBoundary"
import { PageSelectorProps } from "../../ui/PageSelector"
import GridPaginator from "../../ui/GridPaginator"
import React from "react"

const DevicesOverview = ({ mode = "full", pageSelectorPropsSetter }: Props) => {
  const { inverters } = useInverters()
  const { instanceId, vebusInverters } = useVebus()
  const { chargers } = useChargers()
  const generatorFp = useGeneratorFp()
  const generatorRelay = useGeneratorRelay()

  const getDetailDevices = function () {
    let boxes = []

    if (!!chargers) {
      chargers.forEach((charger) => {
        boxes.push(<Charger key={charger} componentMode={"full"} instanceId={charger} />)
      })
    }

    if (!!inverters) {
      inverters.forEach((id) => {
        boxes.push(<Inverter key={id} componentMode={"full"} instanceId={id} isVebusInverter={false} />)
      })
    }

    if (!!vebusInverters) {
      vebusInverters.forEach((id) => {
        boxes.push(<Inverter key={id} componentMode={"full"} instanceId={id} isVebusInverter={true} />)
      })
    }

    if (!!instanceId) {
      boxes.push(<InverterCharger key={"inverterCharger"} componentMode={"full"} />)
    }

    if (!!generatorFp.phases) boxes.push(<GeneratorFp key={"generatorFp"} generatorFp={generatorFp} mode={"full"} />)
    if (!!generatorRelay.settings)
      boxes.push(<GeneratorRelays key={"generatorRelay"} generatorRelay={generatorRelay} mode={"full"} />)

    return boxes
  }

  useVisibilityNotifier({ widgetName: BoxTypes.DEVICES, visible: !!getDetailDevices().length })

  if (mode === "compact") {
    return (
      <Box
        title={translate("boxes.devices")}
        icon={
          <DevicesIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-6 text-victron-gray dark:text-victron-gray-dark"}
          />
        }
        linkedView={AppViews.BOX_DEVICES_OVERVIEW}
      >
        <>
          {chargers && chargers.map((charger: ChargerInstanceId) => <Charger key={charger} instanceId={charger} />)}
          {inverters && inverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={false} />)}
          {!!vebusInverters.length &&
            vebusInverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={true} />)}
          {!!instanceId && <InverterCharger />}
          {!!generatorFp.phases && <GeneratorFp generatorFp={generatorFp} />}
          {!!generatorRelay.settings && <GeneratorRelays generatorRelay={generatorRelay} />}
        </>
      </Box>
    )
  }

  return (
    <GridPaginator
      childClassName={"p-2"}
      childrenPerPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
    >
      {getDetailDevices()}
    </GridPaginator>
  )
}

interface Props {
  mode?: "compact" | "full"
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default withErrorBoundary(observer(DevicesOverview), appErrorBoundaryProps)
