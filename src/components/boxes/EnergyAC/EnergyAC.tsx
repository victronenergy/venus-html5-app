import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import { AcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import ACIcon from '~/public/icons/ac.svg'
import { formatPower, formatValue } from '~/utils/format'

const EnergyAC = ({ mode = 'compact', acLoads }: Props) => {
  const { current, power, phases, voltage } = acLoads

  const totalPower = power.reduce((total, power) => (power ? total + power : total))
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <div className='flex flex-row justify-between items-center'>
        <div className='flex'>
          <ACIcon className={'w-7 text-black dark:text-white'} />
          <p className='text-base md-m:text-xl lg:text-2xl pl-2 md-m:pl-3'>{t('boxes.acLoads')}</p>
        </div>
        <p className='text-base md-m:text-xl lg:text-2xl'>
          {(phases ?? 1) === 1 && (
            <p>
              {formatValue(current[0])}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>A</span>
            </p>
          )}
          {(phases ?? 1) !== 1 && (
            <p>
              {formatPower(totalPower)}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>{totalPower > 1000 ? 'kW' : 'W'}</span>
            </p>
          )}
        </p>
      </div>
    )
  }

  return (
    <Box title={t('boxes.acLoads')} icon={<ACIcon className={'w-5 text-black dark:text-white'} />}>
      <div className='w-full h-full flex flex-col'>
        <div className='text-5xl text-victron-gray dark:text-white md-m:text-6xl'>
          {formatPower(totalPower)}
          <span className='p-0.5 text-victron-gray'>{totalPower > 1000 ? 'kW' : 'W'}</span>
        </div>
        <div className='w-full h-full flex content-end flex-wrap'>
          {Array.from(Array(phases ?? 1).keys()).map((i) => (
            <div key={i} className='w-full grid grid-cols-7 md-m:grid-cols-10'>
              <hr className='col-span-10 h-1 border-victron-gray' />
              <p className='col-span-1 text-base md-m:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {'L' + (i + 1)}
              </p>
              <div className='col-span-3 text-left text-base md-m:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {formatValue(voltage[i])}
                <span className='p-0.5 text-victron-gray '>V</span>
              </div>
              <div className='col-span-3 text-center text-base md-m:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {formatValue(current[i])}
                <span className='p-0.5 text-victron-gray '>A</span>
              </div>
              <div className='hidden text-right text-base md-m:text-2xl text-victron-gray dark:text-victron-gray-dark md-m:col-span-3 md-m:block'>
                {formatValue(power[i])}
                <span className='tp-0.5 text-victron-gray '>
                  {power[i] > 1000 ? 'kW' : 'W'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  )
}

interface Props extends BoxProps {
  acLoads: AcLoadsState
}

export default EnergyAC
