import { useState } from "react"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import classNames from "classnames"
import Box from "../../ui/Box"
import DevicesIcon from "../../../images/icons/devices.svg"
import { AppViews } from "../../../modules/AppViews"
import {
  ChargerInstanceId,
  ConnectedGensetType,
  GeneratorConnectedGensetProvider,
  GeneratorRelayProvider,
  InstanceId,
  InverterInstanceId,
  useChargers,
  useGeneratorConnectedGenset,
  useGeneratorRelay,
  useInverters,
  useVebus,
  VebusInverters,
} from "@victronenergy/mfd-modules"
import Charger from "../Charger"
import Inverter from "../Inverter"
import GeneratorConnectedGenset from "../GeneratorConnectedGenset"
import InverterCharger from "../InverterCharger"
import { useVisibilityNotifier } from "../../../modules"
import { PageSelectorProps } from "../../ui/PageSelector"
import GridPaginator from "../../ui/GridPaginator"
import GeneratorRelay from "../GeneratorRelay/GeneratorRelay"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { AC_SOURCE, BOX_TYPES } from "../../../utils/constants/generic"
import { RELAY_FUNCTION } from "../../../utils/constants/devices/generators"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const DevicesOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { inverters } = useInverters()
  const { instanceId: vebusInstanceId, vebusInverters } = useVebus()
  const { chargers } = useChargers()
  const generatorConnectedGenset = useGeneratorConnectedGenset()
  const generatorRelay = useGeneratorRelay()
  const [compactBoxSize, setCompactBoxSize] = useState<ISize>({ width: 0, height: 0 })

  const boxes = getAvailableDeviceBoxes(
    chargers,
    inverters,
    vebusInverters,
    vebusInstanceId,
    generatorConnectedGenset,
    generatorRelay,
    compactBoxSize,
    componentMode
  )

  const hasValidData = !!boxes.length

  useVisibilityNotifier({ widgetName: BOX_TYPES.DEVICES, isVisible: hasValidData })

  if (!boxes.length) {
    return null
  }

  const activeStyles = applyStyles(compactBoxSize, defaultBoxStyles)

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.devices")}
        icon={
          <DevicesIcon className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)} />
        }
        linkedView={AppViews.BOX_DEVICES_OVERVIEW}
        getBoxSizeCallback={setCompactBoxSize}
        withPagination={true}
        paginationOrientation={"vertical"}
      >
        {boxes}
      </Box>
    )
  }

  return (
    <GridPaginator
      childClassName="p-1"
      perPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {boxes}
    </GridPaginator>
  )
}

const getAvailableDeviceBoxes = function (
  chargers: ChargerInstanceId[],
  inverters: InverterInstanceId[],
  vebusInverters: VebusInverters,
  vebusInstanceId: InstanceId,
  generatorConnectedGenset: GeneratorConnectedGensetProvider,
  generatorRelay: GeneratorRelayProvider,
  compactBoxSize: ISize,
  componentMode?: ComponentMode
) {
  let devices = []

  if (!!chargers) {
    chargers.forEach((charger) => {
      devices.push(
        <Charger key={charger} instanceId={charger} componentMode={componentMode} compactBoxSize={compactBoxSize} />
      )
    })
  }

  if (!!inverters) {
    inverters.forEach((id) => {
      devices.push(
        <Inverter
          key={id}
          instanceId={id}
          isVebusInverter={false}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    })
  }

  if (!!vebusInverters.length) {
    vebusInverters.forEach((id) => {
      devices.push(
        <Inverter
          key={id}
          instanceId={id}
          isVebusInverter={true}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    })
  }

  if (!!vebusInstanceId && !vebusInverters.includes(vebusInstanceId)) {
    devices.push(
      <InverterCharger key={vebusInstanceId} componentMode={componentMode} compactBoxSize={compactBoxSize} />
    )
  }

  if (generatorConnectedGenset.gensetState.gensetType === ConnectedGensetType.ACGENSET) {
    if (!!generatorConnectedGenset.gensetState.phases) {
      devices.push(
        <GeneratorConnectedGenset
          key={"genset"} // only one /generator/1 can be present
          generatorConnectedGenset={generatorConnectedGenset}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    }
  }

  if (generatorConnectedGenset.gensetType === ConnectedGensetType.DCGENSET) {
    devices.push(
      <GeneratorConnectedGenset
        key={"dcgenset"} // only one /generator/1 can be present
        generatorConnectedGenset={generatorConnectedGenset}
        componentMode={componentMode}
        compactBoxSize={compactBoxSize}
      />
    )
  }

  if (!!generatorRelay.settings) {
    // we have relay controlled generator present, show it
    if (
      generatorRelay.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
      generatorRelay.statusCode !== undefined
    ) {
      devices.push(
        <GeneratorRelay
          key="generator_relay"
          {...generatorRelay}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    } else if (generatorRelay.settings.includes(AC_SOURCE.GENERATOR)) {
      // we do not have relay controlled generator configured,
      // but one or more of the AC inputs is set to GENERATOR
      if (generatorConnectedGenset.gensetState.gensetType !== ConnectedGensetType.ACGENSET) {
        // display generator controls for each GENERATOR AC input
        // unless there is a connected genset
        generatorRelay.settings.forEach((source: number, i: number) => {
          if (source === AC_SOURCE.GENERATOR)
            devices.push(
              <GeneratorRelay
                key={"generator_relay" + i}
                {...generatorRelay}
                active={generatorRelay.activeInput === i}
                componentMode={componentMode}
                compactBoxSize={compactBoxSize}
              />
            )
        })
      }
    }
  }

  return devices
}

export default observer(DevicesOverview)
