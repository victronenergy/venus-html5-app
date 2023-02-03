import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { AcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import ACIcon from '~/public/icons/ac.svg'

const EnergyAC = ({ mode = 'compact', acLoads }: Props) => {
  const { current, power, phases, voltage } = acLoads
  const totalPower = power.reduce((total, power) => (power ? total + power : total))
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <div className='flex flex-row justify-between items-center'>
        <div className='flex'>
          <ACIcon className={'w-7 text-black dark:text-white'} />
          <p className='text-2xl pl-3'>{t('boxes.acLoads')}</p>
        </div>
        <p className='text-2xl'>
          {(phases ?? 1) === 1 && (
            <p>
              {current[0].toFixed(1) ?? '--'}
              <span className='text-victron-gray dark:text-victron-gray-dark'> A</span>
            </p>
          )}
          {(phases ?? 1) !== 1 && (
            <p>
              {totalPower.toFixed(1) ?? '--'}
              <span className='text-victron-gray dark:text-victron-gray-dark'> W</span>
            </p>
          )}
        </p>
      </div>
    )
  }

  return (
    <Box title={t('boxes.acLoads')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <p>{current.slice(0, phases ?? 1).map((c) => (c ? c + 'A ' : '--A '))}</p>
        <p>{power.slice(0, phases ?? 1).map((p) => (p ? p + 'W ' : '--W '))}</p>
        <p>{voltage.slice(0, phases ?? 1).map((v) => (v ? v + 'V ' : '--V '))}</p>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  acLoads: AcLoadsState
}

export default EnergyAC
