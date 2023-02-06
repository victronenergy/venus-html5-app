import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { DcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import DCIcon from '~/public/icons/dc.svg'
import { formatPower, formatValue } from '~/utils/format'

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
        <p className='text-2xl'>
          {formatValue(power / voltage)}
          <span className='text-victron-gray dark:text-victron-gray-dark'> A</span>
        </p>
      </div>
    )
  }

  return (
    <Box title={t('boxes.dcLoads')} icon={<DCIcon className={'w-5 text-black dark:text-white'} />}>
      <div className='w-full h-full py-2 flex flex-col'>
        <div className='text-6xl text-victron-gray dark:text-white'>
          {formatValue(power / voltage)}
          <span className='text-victron-gray dark:text-victron-gray-dark'> A</span>
        </div>
        <div className='w-full h-full flex content-end flex-wrap'>
            <div className='w-full'>
              <hr className='w-full h-1 border-victron-gray2 dark:border-victron-gray2-dark' />
              <div className='text-left text-2xl text-victron-gray dark:text-victron-gray-dark'>
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
  dcLoads: DcLoadsState
}

export default EnergyDC
