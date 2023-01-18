import { Battery } from '@elninotech/mfd-modules'

const AuxiliaryBatteryRow = ({ battery }: Props) => {
  return (
    <p>{battery.name}: {battery.voltage}V {battery.current}A {battery.power}W</p>
  )
}

interface Props {
  battery: Battery
}

export default AuxiliaryBatteryRow