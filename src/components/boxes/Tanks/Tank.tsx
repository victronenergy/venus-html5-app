import { useTank } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'

const Tank = ({ tankInstanceId }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)

  return (
    <div>
      { level !== undefined && (<p>Level: { level + ' %'}</p>) }
      { capacity !== undefined && (<p>Capacity: { capacity }</p>) }
      { remaining !== undefined && (<p>Remaining: { remaining }</p>) }
      { fluidType !== undefined && (<p>Fluid: { fluidTypeFormatter(+fluidType) }</p>)}
    </div>
  )
}

interface Props {
  tankInstanceId: number
}

const fluidTypeFormatter = function (type: number) {
  switch (type) {
    case 0: return 'Fuel'
    case 1: return 'Fresh water'
    case 2: return 'Waste water'
    case 3: return 'Live well'
    case 4: return 'Oil'
    case 5: return 'Black water (sewage)'
    case 6: return 'Gasoline'
    case 7: return 'Diesel'
    case 8: return 'Liquid  Petroleum Gas (LPG)'
    case 9: return 'Liquid Natural Gas (LNG)'
    case 10: return 'Hydraulic oil'
    case 11: return 'Raw water'
    default: return null
  }
}

export default observer(Tank)