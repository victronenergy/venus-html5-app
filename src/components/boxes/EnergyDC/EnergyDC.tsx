import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { DcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import DCIcon from '~/public/icons/dc.svg'

const EnergyDC = ({ mode = 'compact', dcLoads }: Props) => {
  const { power, voltage } = dcLoads
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <div className='flex flex-row justify-between items-center'>
        <div className='flex'>
          <DCIcon className={'w-7 text-black dark:text-white'} />
          <p className='text-2xl pl-3'>{t('boxes.dcLoads')}</p>
        </div>
        <p className='text-2xl'>{Math.round(power / voltage)}<span className='text-victron-gray dark:text-victron-gray-dark'>A</span></p>
      </div>
    ) 
  }

  return (
    <Box title={t('boxes.dcLoads')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <p>{Math.round(power / voltage) + 'A'}</p>
        <p>{Math.round(power) + 'W'}</p>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  dcLoads: DcLoadsState
}

export default EnergyDC
