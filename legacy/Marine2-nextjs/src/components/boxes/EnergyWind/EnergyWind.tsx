import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import WindIcon from '~/public/icons/wind.svg'
import { useWindGenerator } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react-lite'

const EnergyWind = ({ mode = 'compact', windGenerator, showInstance }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)
  const instance = showInstance ? ` [${windGenerator}]` : ''
  const power = current * voltage
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <p>
      {t('boxes.windGenerator')}
      { instance }
      : { current || current === 0 ? Math.round(current) : '--' }A
    </p>
  }

  return (
    <Box
      title={t('boxes.windGenerator') + instance}
      icon={<WindIcon className={'w-6 text-black dark:text-white'} />}
    >
      <>
        <p>{ Math.round(current) }A</p>
        <p>{ Math.round(power) }W</p>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  windGenerator: number
  showInstance: boolean
}

export default observer(EnergyWind)
