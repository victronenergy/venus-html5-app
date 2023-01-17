import { observer } from 'mobx-react-lite'
import { useAcLoads } from '@elninotech/mfd-modules'

const AcLoads = () => {
  const { current } = useAcLoads()
  const parsedCurrent = current.reduce((sum, val) => val ? sum + val : sum);

  return (
    <p>
      AC: {current[0] && parsedCurrent ? parsedCurrent + 'A' : '--A'}
    </p>
  )
}

export default observer(AcLoads)