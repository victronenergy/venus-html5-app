import { observer } from 'mobx-react-lite'
import { useAcLoads, useDcLoads } from '@elninotech/mfd-modules'

const DcLoads = () => {
  const { power, voltage } = useDcLoads()

  return (
    <p>
      DC: {power && voltage ? Math.round(power / voltage) + 'A ' : '--A'}
    </p>
  )
}

export default observer(DcLoads)