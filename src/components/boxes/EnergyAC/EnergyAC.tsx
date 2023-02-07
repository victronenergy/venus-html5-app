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
          <p className='text-xl md:text-2xl pl-2 md:pl-3'>{t('boxes.acLoads')}</p>
        </div>
        <p className='text-xl md:text-2xl'>
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
      <div className='w-full h-full py-2 flex flex-col'>
        <div className='text-4xl text-victron-gray dark:text-white md:text-6xl'>
          {formatPower(totalPower)}
          <span className='p-0.5 text-victron-gray-100 dark:text-victron-gray-900'>{totalPower > 1000 ? 'kW' : 'W'}</span>
        </div>
        <div className='w-full h-full flex content-end flex-wrap'>
          {Array.from(Array(phases ?? 1).keys()).map((i) => (
            <div key={i} className='w-full grid grid-cols-7 md:grid-cols-10'>
              <hr className='col-span-10 h-1 border-victron-gray-100 dark:border-victron-gray-900' />
              <p className='col-span-1 text-xl md:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {'L' + (i + 1)}
              </p>
              <div className='col-span-3 text-left text-xl md:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {formatValue(voltage[i])}
                <span className='p-0.5 text-victron-gray-100 dark:text-victron-gray-900'>V</span>
              </div>
              <div className='col-span-3 text-center text-xl md:text-2xl text-victron-gray dark:text-victron-gray-dark'>
                {formatValue(current[i])}
                <span className='p-0.5 text-victron-gray-100 dark:text-victron-gray-900'>A</span>
              </div>
              <div className='hidden text-right text-xl md:text-2xl text-victron-gray dark:text-victron-gray-dark md:col-span-3 md:block'>
                {formatValue(power[i])}
                <span className='tp-0.5 ext-victron-gray-100 dark:text-victron-gray-900'>
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
