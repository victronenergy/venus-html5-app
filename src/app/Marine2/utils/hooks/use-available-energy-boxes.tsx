import {
  useAcLoads,
  useAlternators,
  useDcLoads,
  usePvCharger,
  useShorePowerInput,
  useWindGenerators,
} from "@victronenergy/mfd-modules"
import { ComponentMode } from "@m2Types/generic/component-mode"
import EnergyShore from "../../components/boxes/EnergyShore"
import EnergyWind from "../../components/boxes/EnergyWind"
import EnergySolar from "../../components/boxes/EnergySolar"
import EnergyAC from "../../components/boxes/EnergyAC"
import EnergyDC from "../../components/boxes/EnergyDC"
import EnergyAlternator from "../../components/boxes/EnergyAlternator"
import { ISize } from "@m2Types/generic/size"

// TODO Refactor
//  Get data in box components themselves.
//  Return null if conditions are not met.
//  Noticed some data inconsistencies (undefined values) when using this array.push method/prop data.
export const useAvailableEnergyBoxes = (compactBoxSize: ISize, componentMode?: ComponentMode) => {
  const { inputId: shoreInputId } = useShorePowerInput()
  const { phases } = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { alternators } = useAlternators()
  const { windGenerators } = useWindGenerators()

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

  return boxes
}
