import { observer } from 'mobx-react-lite'
import { usePvCharger, useVebus } from '@elninotech/mfd-modules'
import Solar from '~/components/boxes/EnergyOverview/Solar'
import ActiveInput from '~/components/boxes/EnergyOverview/ActiveInput'
import AcLoads from '~/components/boxes/EnergyOverview/AcLoads'
import DcLoads from '~/components/boxes/EnergyOverview/DcLoads'

const EnergyLoads = () => {
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions

  return (
    <div>
      <ActiveInput />
      <Solar />
      <AcLoads />
      <DcLoads />
    </div>
  )
}

export default observer(EnergyLoads)