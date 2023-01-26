import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { WindGeneratorId } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'
import WindGeneratorSummary from '~/components/boxes/EnergyWind/WindGeneratorSummary'
import { observer } from 'mobx-react-lite'

const EnergyWind = ({ mode = 'compact', windGenerators }: Props) => {
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <>
      {windGenerators.map(instance => instance || instance === 0 ?
        <WindGeneratorSummary
          key={instance}
          instance={instance}
          showInstance={windGenerators.length > 1}
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
  windGenerators: WindGeneratorId[]
}

export default observer(EnergyWind)
