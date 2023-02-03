import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { PvChargerState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import SolarIcon from '~/public/icons/solar.svg'

const EnergySolar = ({ mode = 'compact', pvCharger }: Props) => {
  const { current, power } = pvCharger
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <div className='flex flex-row justify-between items-center'>
        <div className='flex'>
          <SolarIcon className={'w-7 text-black dark:text-white'} />
          <p className='text-2xl pl-3'>{t('boxes.solar')}</p>
        </div>
        <p className='text-2xl'>{current.toFixed(1)}<span className='text-victron-gray dark:text-victron-gray-dark'> A</span></p>
      </div>
    ) 
  }

  return (
    <Box title={t('boxes.solar')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <p>{ Math.round(current) }A</p>
        <p>{ Math.round(power) }W</p>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  pvCharger: PvChargerState
}

export default EnergySolar
