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

const EnergyOverview = ({ mode = "compact" }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const { inputId: shoreInputId } = useShorePowerInput()
  const acLoads = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { alternators } = useAlternators()
  const { windGenerators } = useWindGenerators()

  if (mode === "compact") {
    return (
      <Box
        title={translate("boxes.energy")}
        /* todo: fix types for svg */
        /* @ts-ignore */
        icon={<EnergyIcon className={"w-6 text-victron-gray dark:text-victron-gray-dark"} />}
        linkedView={AppViews.BOX_ENERGY_OVERVIEW}
      >
        <div className="flex flex-col">
          {getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads, alternators, windGenerators)}
        </div>
      </Box>
    )
  }

  return (
    <Grid childClassName={"p-1"}>
      {getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads, alternators, windGenerators)}
    </Grid>
  )
}

const getAvailableEnergyBoxes = function (
  mode: "compact" | "full" | undefined,
  shoreInputId: number | null | undefined,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState,
  alternators: AlternatorId[],
  windGenerators: WindGeneratorId[]
) {
  const boxes = []

  if (shoreInputId) {
    boxes.push(<EnergyShore mode={mode} inputId={shoreInputId} />)
  }

  if ((pvCharger.current || pvCharger.current === 0) && (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(<EnergySolar mode={mode} pvCharger={pvCharger} />)
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

  if (acLoads.phases) boxes.push(<EnergyAC mode={mode} acLoads={acLoads} />)

  if ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0)) {
    boxes.push(<EnergyDC mode={mode} dcLoads={dcLoads} />)
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
