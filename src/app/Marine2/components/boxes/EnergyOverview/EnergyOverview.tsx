import React from "react"
import Box from "../../../components/ui/Box"
import EnergyIcon from "../../../images/icons/energy.svg"
import Grid from "../../../components/ui/Grid"
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
} from "@elninotech/mfd-modules"
import EnergyShore from "../EnergyShore"
import { observer } from "mobx-react-lite"
import EnergyWind from "../EnergyWind"
import EnergyAlternator from "../EnergyAlternator"
import { translate } from "react-i18nify"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"

const EnergyOverview = ({ mode = "compact" }: Props) => {
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
    mode,
    shoreInputId,
    acLoads,
    pvCharger,
    dcLoads,
    alternators,
    windGenerators,
    compactBoxSize
  )

  // TODO: it seems that visibility logic can be improved since the energy component always has an overview box
  useVisibilityNotifier({ widgetName: BoxTypes.ENERGY, visible: boxes.length > 0 })

  if (!boxes.length) {
    return null
  }

  if (mode === "compact") {
    return (
      <Box
        title={translate("boxes.energy")}
        /* todo: fix types for svg */
        /* @ts-ignore */
        icon={<EnergyIcon className={"w-6 text-victron-gray dark:text-victron-gray-dark"} />}
        linkedView={AppViews.BOX_ENERGY_OVERVIEW}
        getBoxSizeCallback={setCompactBoxSize}
      >
        <div className="flex flex-col">{boxes}</div>
      </Box>
    )
  }

  return <Grid childClassName={"p-2"}>{boxes}</Grid>
}

const getAvailableEnergyBoxes = function (
  mode: "compact" | "full" | undefined,
  shoreInputId: number | null | undefined,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState,
  alternators: AlternatorId[],
  windGenerators: WindGeneratorId[],
  compactBoxSize: { width: number; height: number }
) {
  const boxes = []

  if (shoreInputId) {
    boxes.push(<EnergyShore mode={mode} inputId={shoreInputId} compactBoxSize={compactBoxSize} />)
  }

  if ((pvCharger.current || pvCharger.current === 0) && (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(<EnergySolar mode={mode} pvCharger={pvCharger} compactBoxSize={compactBoxSize} />)
  }

  // Add a divider if there are any AC loads or DC loads in the compact mode
  if (
    mode === "compact" &&
    (acLoads.phases || ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0)))
  ) {
    boxes.push(
      <div className="flex flex-row justify-between">
        <div className="text-xs text-victron-gray">{translate("common.loads")}</div>
        <div className="w-full ml-2 mb-2 border-b border-victron-gray" />
      </div>
    )
  }

  if (acLoads.phases) boxes.push(<EnergyAC mode={mode} acLoads={acLoads} compactBoxSize={compactBoxSize} />)

  if ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0)) {
    boxes.push(<EnergyDC mode={mode} dcLoads={dcLoads} compactBoxSize={compactBoxSize} />)
  }

  const alternatorsPresent = alternators.filter((v) => v || v === 0)
  if (alternatorsPresent && alternatorsPresent.length > 0) {
    boxes.push(
      ...alternatorsPresent.map((alternator) => (
        <EnergyAlternator
          key={`alternator_${alternator}`}
          mode={mode}
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
          mode={mode}
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
  mode?: "compact" | "full"
}

export default observer(EnergyOverview)
