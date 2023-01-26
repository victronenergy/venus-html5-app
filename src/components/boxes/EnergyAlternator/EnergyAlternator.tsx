import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { AlternatorId } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import AlternatorSummary from '~/components/boxes/EnergyAlternator/AlternatorSummary'

const EnergyAlternator = ({ mode = 'compact', alternators }: Props) => {
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <>
      {alternators.map(instance => instance || instance === 0 ?
        <AlternatorSummary
          key={instance}
          instance={instance}
          showInstance={alternators.length > 1}
        />
      : null)}
    </>
  }

  return (
    <Box title={t('boxes.solar')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  alternators: AlternatorId[]
}

export default EnergyAlternator
