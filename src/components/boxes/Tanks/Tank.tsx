import { useTank } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import ProgressBar from '~/components/ui/ProgressBar'
import classnames from 'classnames'

import FuelIcon from '~/public/icons/fuel.svg'
import WaterIcon from '~/public/icons/fresh-water.svg'
import BlackWaterIcon from '~/public/icons/black-water.svg'
import GrayWaterIcon from '~/public/icons/waste-water.svg'

const Tank = ({ tankInstanceId, mode = 'compact', orientation = 'vertical' }: Props) => {
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
            <div>{fluidIcon(+fluidType, orientation)}</div>
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

  if (orientation === 'vertical') {
    return (
      <div>
        <div className='grid grid-cols-8 gap-2'>
          <div className='col-span-3 flex items-center md:col-span-2'>
            <div>{fluidIcon(+fluidType, orientation)}</div>
            <div className='flex flex-col p-2'>
              <div className='text-2xl'>{fluidTypeFormatter(+fluidType)}</div>
              <div className='text-victron-gray'>
                {formatCapacity(remaining) + '/' + formatCapacity(capacity) + ' l'}
              </div>
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
  } else {
    return (
      <div className='h-full w-full grid grid-cols-8'>
        <div className='w-full col-span-1'>
          <ProgressBar percentage={levelFormatter(level)} type={+fluidType} orientation='vertical' />
        </div>
        <div className='col-span-7 flex flex-col justify-between'>
          <div className='pt-2'>
            <div>{fluidIcon(+fluidType, orientation)}</div>
            <div className=''>
              <div className='text-2xl'>{fluidTypeFormatter(+fluidType)}</div>
            </div>
          </div>
          <div className='flex flex-col'>
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
            <div className='text-victron-gray'>{formatCapacity(remaining) + '/' + formatCapacity(capacity) + ' l'}</div>
          </div>
        </div>
      </div>
    )
  }
}

// Convert remaining and total capacity to liters from m3
const formatCapacity = function (capacity: number) {
  return Math.round(capacity * 1000)
}

const levelFormatter = function (level: number) {
  return Math.round(level)
}

const fluidIcon = function (type: number, mode: string = 'compact') {
  switch (type) {
    case 0:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 1:
      return mode === 'compact' ? <WaterIcon className='w-7'/> : <WaterIcon className='w-9'/>
    case 2:
      return mode === 'compact' ? <GrayWaterIcon className='w-7'/> : <GrayWaterIcon className='w-9'/>
    case 3:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 4:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 5:
      return mode === 'compact' ? <BlackWaterIcon className='w-7'/> : <BlackWaterIcon className='w-9'/>
    case 6:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 7:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 8:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 9:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 10:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
    case 11:
      return mode === 'compact' ? <FuelIcon className='w-7'/> : <FuelIcon className='w-9'/>
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
  orientation?: 'vertical' | 'horizontal'
}

export default observer(Tank)