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
  let fluidTypeNum = +fluidType
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
            <div>{fluidIcon(fluidTypeNum, orientation)}</div>
            <div className='flex flex-col p-1 sm:p-2'>
              <div className='text-base md:text-lg lg:text-xl'>{fluidTypeFormatter(fluidTypeNum)}</div>
            </div>
          </div>
          <div className='flex items-center justify-center invisible sm:visible sm:col-span-4 lg:col-span-5'>
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
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
                  'text-victron-red/70': level > 75,
                  'text-victron-gray/70': level <= 75,
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
            <div>{fluidIcon(fluidTypeNum, orientation)}</div>
            <div className='flex flex-col p-2'>
              <div className='text-2xl'>{fluidTypeFormatter(fluidTypeNum)}</div>
              <div className='text-victron-gray'>
                {formatCapacity(remaining) + '/' + formatCapacity(capacity) + ' l'}
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center col-span-4 md:col-span-5'>
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
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
                  'text-victron-red/70': level > 75,
                  'text-victron-gray/70': level <= 75,
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
    <div className='h-full w-full grid grid-cols-8'>
      <div className='w-full col-span-1'>
        <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation='vertical' />
      </div>
      <div className='col-span-7 flex flex-col justify-between'>
        <div className='pt-2'>
          <div>{fluidIcon(fluidTypeNum, orientation)}</div>
          <div className=''>
            <div className='text-2xl'>{fluidTypeFormatter(fluidTypeNum)}</div>
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
                'text-victron-red/70': level > 75,
                'text-victron-gray/70': level <= 75,
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

// Convert remaining and total capacity to liters from m3
const formatCapacity = (capacity: number) => {
  return Math.round(capacity * 1000)
}

const levelFormatter = (level: number) => {
  return Math.round(level)
}

const fluidIcon = (type: number, mode: string = 'compact') => {
  switch (type) {
    case 0:
    case 3:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return <FuelIcon className={mode === 'compact' ? 'w-7' : 'w-9'} />
    case 1:
      return <WaterIcon className={mode === 'compact' ? 'w-7' : 'w-9'} />
    case 2:
      return <GrayWaterIcon className={mode === 'compact' ? 'w-7' : 'w-9'} />
    case 5:
      return <BlackWaterIcon className={mode === 'compact' ? 'w-7' : 'w-9'} />
    default:
      return null
  }
}

// TODO: Add translations
const fluidTypeFormatter = (type: number) => {
  const fluids = [
    'Fuel',
    'Fresh water',
    'Waste water',
    'Live well',
    'Oil',
    'Black water',
    'Gasoline',
    'Diesel',
    'Liquid  Petroleum Gas (LPG)',
    'Liquid Natural Gas (LNG)',
    'Hydraulic oil',
    'Raw water',
  ]

  return fluids[type]
}

interface Props {
  tankInstanceId: number
  mode?: 'compact' | 'full'
  orientation?: 'vertical' | 'horizontal'
}

export default observer(Tank)

export default observer(Tank)