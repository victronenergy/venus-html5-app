import { Battery } from '@elninotech/mfd-modules'
import { batteryStateFormatter } from '~/utils/formatters'

const BatterySummary = ({ battery }: Props) => {
  return <div>
    <p>{battery.name} - {batteryStateFormatter(battery.state)}: {battery.soc}%</p>
  </div>
}

interface Props {
  battery: Battery
}

export default BatterySummary