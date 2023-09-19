import React from "react"
import Box from "../../../components/ui/Box"
import EnergyIcon from "../../../images/icons/energy.svg"
import EnergyAC from "../EnergyAC"
import EnergyDC from "../EnergyDC"
import EnergySolar from "../EnergySolar"
import {
  AcLoadsState,
  AlternatorId,
  DcLoadsState,
  PvChargerState,
  useAcLoads,
  useAlternators,
  useDcLoads,
  usePvCharger,
  useShorePowerInput,
  useVebus,
  useWindGenerators,
  WindGeneratorId,
} from "@victronenergy/mfd-modules"
import EnergyShore from "../EnergyShore"
import { observer } from "mobx-react-lite"
import EnergyWind from "../EnergyWind"
import EnergyAlternator from "../EnergyAlternator"
import { translate } from "react-i18nify"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import classNames from "classnames"
import { ComponentMode } from "@m2Types/generic/component-mode"

const EnergyOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const { inputId: shoreInputId } = useShorePowerInput()
  const acLoads = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { alternators } = useAlternators()
  const { windGenerators } = useWindGenerators()
  const [compactBoxSize, setCompactBoxSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const boxes = getAvailableEnergyBoxes(
    shoreInputId,
    acLoads,
    pvCharger,
    dcLoads,
    alternators,
    windGenerators,
    compactBoxSize,
    componentMode
  )

  const activeStyles = applyStyles(compactBoxSize, defaultBoxStyles)

  // TODO: it seems that visibility logic can be improved since the energy component always has an overview box
  useVisibilityNotifier({ widgetName: BoxTypes.ENERGY, visible: boxes.length > 0 })

  if (!boxes.length) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.energy")}
        /* todo: fix types for svg */
        icon={
          <EnergyIcon
            /* @ts-ignore */
            className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)}
          />
        }
        linkedView={AppViews.BOX_ENERGY_OVERVIEW}
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
      childClassName={"p-1"}
      perPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {boxes}
    </GridPaginator>
  )
}

const getAvailableEnergyBoxes = function (
  shoreInputId: number | null | undefined,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState,
  alternators: AlternatorId[],
  windGenerators: WindGeneratorId[],
  compactBoxSize: { width: number; height: number },
  componentMode?: ComponentMode
) {
  const boxes = []

  if (shoreInputId) {
    boxes.push(
      <EnergyShore
        key={`energy-shore`}
        componentMode={componentMode}
        inputId={shoreInputId}
        compactBoxSize={compactBoxSize}
      />
    )
  }

  if ((pvCharger.current || pvCharger.current === 0) && (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(
      <EnergySolar
        key={`energy-solar`}
        componentMode={componentMode}
        pvCharger={pvCharger}
        compactBoxSize={compactBoxSize}
      />
    )
  }

  if (acLoads.phases)
    boxes.push(
      <EnergyAC key={`energy-ac`} componentMode={componentMode} acLoads={acLoads} compactBoxSize={compactBoxSize} />
    )

  if ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0) && dcLoads.power) {
    boxes.push(
      <EnergyDC key={`energy-dc`} componentMode={componentMode} dcLoads={dcLoads} compactBoxSize={compactBoxSize} />
    )
  }

  const alternatorsPresent = alternators.filter((v) => v || v === 0)
  if (alternatorsPresent && alternatorsPresent.length > 0) {
    boxes.push(
      ...alternatorsPresent.map((alternator) => (
        <EnergyAlternator
          key={`alternator_${alternator}`}
          componentMode={componentMode}
          alternator={alternator ?? 0}
          showInstance={alternators.length > 1}
          compactBoxSize={compactBoxSize}
        />
      ))
    )
  }

  const windGeneratorsPresent = windGenerators.filter((v) => v || v === 0)
  if (windGeneratorsPresent && windGeneratorsPresent.length > 0) {
    boxes.push(
      ...windGeneratorsPresent.map((windGenerator) => (
        <EnergyWind
          key={`wind_${windGenerator}`}
          componentMode={componentMode}
          windGenerator={windGenerator ?? 0}
          showInstance={alternators.length > 1}
          compactBoxSize={compactBoxSize}
        />
      ))
    )
  }

  return boxes
}

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default observer(EnergyOverview)
