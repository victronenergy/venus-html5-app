import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import AlternatorIcon from '~/public/icons/alternator.svg'
import { useAlternator } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'

const EnergyAlternator = ({ mode = 'compact', alternator, showInstance }: Props) => {
  const { current, voltage } = useAlternator(alternator)
  const instance = showInstance ? ` [${alternator}]` : ''
  const power = current * voltage
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <p>
      {t('boxes.alternator')}
      { instance }
      : { current || current === 0 ? Math.round(current) : '--' }A
    </p>
  }

  return (
    <Box
      title={t('boxes.alternator') + instance}
      icon={<AlternatorIcon className={'w-6 text-black dark:text-white'} />}
    >
      <>
        <p>{ Math.round(current) }A</p>
        <p>{ Math.round(power) }W</p>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  alternator: number
  showInstance: boolean
}

export default EnergyAlternator
