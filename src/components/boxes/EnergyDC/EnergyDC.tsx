import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { DcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'

const EnergyDC = ({ mode = 'compact', dcLoads }: Props) => {
  const { power, voltage } = dcLoads
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <p>{t('boxes.dcLoads')}: {Math.round(power / voltage) + 'A'}</p>
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
