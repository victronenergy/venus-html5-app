import Box from "~/components/ui/Box"
import { Battery } from '@elninotech/mfd-modules'
import AuxiliaryBatteryRow from '~/components/boxes/AuxiliaryBatteries/AuxiliaryBatteryRow'

const AuxiliaryBatteries = ({ batteries }: Props) => {
  return (
    <Box title={'Auxiliary Batteries'}>
      <>{ batteries.map(b => <AuxiliaryBatteryRow key={b.id} battery={b} />) }</>
    </Box>
  )
}

interface Props {
  batteries: Battery[]
}

export default AuxiliaryBatteries