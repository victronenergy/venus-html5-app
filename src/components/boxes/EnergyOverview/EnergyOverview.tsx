import React from 'react'
import Box from '~/components/ui/Box'
import EnergyIcon from '~/public/icons/energy.svg'
import { BoxProps } from '~/types/boxes'
import EnergyAC from '~/components/boxes/EnergyAC'
import Grid from '~/components/ui/Grid'
import EnergyDC from '~/components/boxes/EnergyDC/EnergyDC'
import EnergySolar from '~/components/boxes/EnergySolar/EnergySolar'
import EnergyShore from '~/components/boxes/EnergyShore/EnergyShore'
import { RouterPath } from '~/types/routes'
import { useTranslation } from 'next-i18next'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <Box
        title={t('boxes.energy')}
        icon={<EnergyIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandHref={`${RouterPath.BOX}/EnergyOverview`}
      >
        <Grid className={'gap-2'}>
          <EnergyShore />
          <EnergyAC />
          <EnergySolar />
          <EnergyDC />
        </Grid>
      </Box>
    )
  }

  return (
    <Grid className={'gap-2'}>
      <EnergyShore mode={'full'} />
      <EnergyAC mode={'full'} />
      <EnergySolar mode={'full'} />
      <EnergyDC mode={'full'} />
    </Grid>
  )
}

export default EnergyOverview
