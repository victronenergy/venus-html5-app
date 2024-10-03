import { FC, useState } from "react"
import classNames from "classnames"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import Box from "../../../components/ui/Box"
import EnergyIcon from "../../../images/icons/energy.svg"
import {
  AlternatorId,
  ConnectedGensetId,
  ConnectedGensetType,
  DcLoadsState,
  PvChargerState,
  ShorePowerInputId,
  useAcLoads,
  useAlternators,
  useConnectedGensets,
  useDcLoads,
  usePvCharger,
  useShorePowerInput,
  useWindGenerators,
  WindGeneratorId,
} from "@victronenergy/mfd-modules"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { BOX_TYPES } from "../../../utils/constants/generic"
import EnergyShore from "../EnergyShore"
import EnergySolar from "../EnergySolar"
import EnergyAC from "../EnergyAC"
import EnergyDC from "../EnergyDC"
import EnergyAlternator from "../EnergyAlternator"
import EnergyWind from "../EnergyWind"
import EnergyConnectedGenset from "../EnergyConnectedGenset"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const EnergyOverview: FC<Props> = ({ componentMode = "full", pageSelectorPropsSetter }) => {
  const { inputId: shoreInputId } = useShorePowerInput()
  const { phases } = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { alternators } = useAlternators()
  const { windGenerators } = useWindGenerators()
  const { dcGensets } = useConnectedGensets(ConnectedGensetType.DCGENSET)
  const [compactBoxSize, setCompactBoxSize] = useState<ISize>({ width: 0, height: 0 })

  const boxes = getAvailableEnergyBoxes(
    shoreInputId,
    phases,
    dcLoads,
    pvCharger,
    alternators,
    windGenerators,
    dcGensets,
    compactBoxSize,
    componentMode
  )

  const hasValidData = !!boxes.length

  useVisibilityNotifier({ widgetName: BOX_TYPES.ENERGY, isVisible: hasValidData })

  const activeStyles = applyStyles(compactBoxSize, defaultBoxStyles)

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.energy")}
        icon={
          <EnergyIcon className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)} />
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

export const getAvailableEnergyBoxes = (
  shoreInputId: ShorePowerInputId,
  phases: number,
  dcLoads: DcLoadsState,
  pvCharger: PvChargerState,
  alternators: AlternatorId[],
  windGenerators: WindGeneratorId[],
  dcGensets: ConnectedGensetId[],
  compactBoxSize: ISize,
  componentMode?: ComponentMode
) => {
  const boxes = []

  if (shoreInputId) {
    boxes.push(
      <EnergyShore
        key="energy-shore"
        inputId={shoreInputId}
        componentMode={componentMode}
        compactBoxSize={compactBoxSize}
      />
    )
  }

  if ((pvCharger.current || pvCharger.current === 0) && (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(
      <EnergySolar
        key="energy-solar"
        pvCharger={pvCharger}
        componentMode={componentMode}
        compactBoxSize={compactBoxSize}
      />
    )
  }

  if (phases) {
    boxes.push(<EnergyAC key="energy-ac" componentMode={componentMode} compactBoxSize={compactBoxSize} />)
  }

  // TODO double check if data is up to date.
  if ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0) && dcLoads.power) {
    boxes.push(
      <EnergyDC key="energy-dc" componentMode={componentMode} dcLoads={dcLoads} compactBoxSize={compactBoxSize} />
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

  const dcGensetsPresent = dcGensets.filter((v) => v || v === 0)
  if (dcGensetsPresent && dcGensetsPresent.length > 0) {
    boxes.push(
      ...dcGensetsPresent.map((genset) => (
        <EnergyConnectedGenset
          key={`dcgenset_${genset}`}
          componentMode={componentMode}
          gensetType={ConnectedGensetType.DCGENSET}
          gensetInstance={genset ?? 0}
          showInstance={dcGensets.length > 1}
          compactBoxSize={compactBoxSize}
        />
      ))
    )
  }

  return boxes
}

export default observer(EnergyOverview)
