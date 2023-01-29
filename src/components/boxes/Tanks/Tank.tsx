import { useTank } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import ProgressBar from '~/components/ui/ProgressBar'
import classnames from 'classnames'

import FuelIcon from '~/public/icons/tanks/fuel.svg'
import WaterIcon from '~/public/icons/tanks/water.svg'
import BlackWaterIcon from '~/public/icons/tanks/black-water.svg'
import GrayWaterIcon from '~/public/icons/tanks/gray-water.svg'

const Tank = ({ tankInstanceId, mode = 'compact' }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)

  // check if tank values are not undefined
  if (
    capacity === undefined ||
    fluidType === undefined ||
    level === undefined ||
    remaining === undefined ||
    unit === undefined
  ) {
    return null
  }

  if (mode === 'compact') {
    return (
      <div>
        <div className='grid grid-cols-8 gap-2'>
          <div className='col-span-6 flex items-center sm:col-span-3 lg:col-span-2'>
            <div>{fluidIcon(+fluidType)}</div>
            <div className='flex flex-col p-2'>
              <div className='text-lg lg:text-xl'>{fluidTypeFormatter(+fluidType)}</div>
            </div>
          </div>
          <div className='flex items-center justify-center invisible sm:visible sm:col-span-4 lg:col-span-5'>
            <ProgressBar percentage={levelFormatter(level)} type={+fluidType} />
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <div
              className={classnames('text-3xl flex flex-row pr-2', {
                'text-victron-red': level > 75,
              })}
            >
              <div>{levelFormatter(level)}</div>
              <div
                className={classnames({
                  'text-victron-red': level > 75,
                  'text-victron-gray': level <= 75,
                })}
              >
                {' %'}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='grid grid-cols-8 gap-2'>
        <div className='col-span-3 flex items-center md:col-span-2'>
          <div>{fluidIcon(+fluidType)}</div>
          <div className='flex flex-col p-2'>
            <div className='text-xl'>{fluidTypeFormatter(+fluidType)}</div>
            <div className='text-gray-5'>{formatCapacity(remaining) + '/' + formatCapacity(capacity) + ' l'}</div>
          </div>
        </div>
        <div className='flex items-center justify-center col-span-4 md:col-span-5'>
          <ProgressBar percentage={levelFormatter(level)} type={+fluidType} />
        </div>
        <div className='col-span-1 flex items-center justify-center'>
          <div
            className={classnames('text-3xl flex flex-row', {
              'text-victron-red': level > 75,
            })}
          >
            <div>{levelFormatter(level)}</div>
            <div
              className={classnames({
                'text-victron-red': level > 75,
                'text-victron-gray': level <= 75,
              })}
            >
              {' %'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Convert remaining and total capacity to liters from m3
const formatCapacity = function (capacity: number) {
  return Math.round(capacity * 1000)
}

const levelFormatter = function (level: number) {
  return Math.round(level)
}

const fluidIcon = function (type: number) {
  switch (type) {
    case 0:
      return <FuelIcon />
    case 1:
      return <WaterIcon />
    case 2:
      return <GrayWaterIcon />
    case 3:
      return <FuelIcon />
    case 4:
      return <FuelIcon />
    case 5:
      return <BlackWaterIcon />
    case 6:
      return <FuelIcon />
    case 7:
      return <FuelIcon />
    case 8:
      return <FuelIcon />
    case 9:
      return <FuelIcon />
    case 10:
      return <FuelIcon />
    case 11:
      return <FuelIcon />
    default:
      return null
  }
}

const fluidTypeFormatter = function (type: number) {
  switch (type) {
    case 0:
      return 'Fuel'
    case 1:
      return 'Fresh water'
    case 2:
      return 'Waste water'
    case 3:
      return 'Live well'
    case 4:
      return 'Oil'
    case 5:
      return 'Black water'
    case 6:
      return 'Gasoline'
    case 7:
      return 'Diesel'
    case 8:
      return 'Liquid  Petroleum Gas (LPG)'
    case 9:
      return 'Liquid Natural Gas (LNG)'
    case 10:
      return 'Hydraulic oil'
    case 11:
      return 'Raw water'
    default:
      return null
  }
}

interface Props {
  tankInstanceId: number
  mode?: 'compact' | 'full'
}

export default observer(Tank)