import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { PvChargerState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'

const EnergySolar = ({ mode = 'compact', pvCharger }: Props) => {
  const { current, power } = pvCharger
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <p>{t('boxes.solar')}: { Math.round(current) }A</p>
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
