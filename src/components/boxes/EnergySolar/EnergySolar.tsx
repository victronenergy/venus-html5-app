import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import { PvChargerState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import SolarIcon from '~/public/icons/solar.svg'
import { formatPower, formatValue } from '~/utils/format'

const EnergySolar = ({ mode = 'compact', pvCharger }: Props) => {
  const { current, power } = pvCharger
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <div className='flex flex-row justify-between items-center'>
        <div className='flex'>
          <SolarIcon className={'w-7 text-black dark:text-white'} />
          <p className='text-xl md:text-2xl pl-2 md:pl-3'>{t('boxes.solar')}</p>
        </div>
        <p className='text-xl md:text-2xl'>
          {formatValue(current)}
          <span className='text-victron-gray dark:text-victron-gray-dark'> A</span>
        </p>
      </div>
    )
  }

  return (
    <Box title={t('boxes.solar')} icon={<SolarIcon className={'w-5 text-black dark:text-white'} />}>
      <div className='w-full h-full py-2 flex flex-col'>
        <div className='text-xl text-victron-gray dark:text-white md:text-6xl'>
          {formatValue(current)}
          <span className='text-victron-gray dark:text-victron-gray-dark'> A</span>
        </div>
        <div className='w-full h-full flex content-end flex-wrap'>
          <div className='w-full'>
            <hr className='w-full h-1 border-victron-gray2 dark:border-victron-gray2-dark' />
            <div className='text-left text-xl text-victron-gray dark:text-victron-gray-dark md:text-2xl'>
              {formatPower(power)}
              <span className='text-victron-gray2 dark:text-victron-gray2-dark'> W</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

interface Props extends BoxProps {
  pvCharger: PvChargerState
}

export default EnergySolar
