import React from 'react'
import Box from '~/components/ui/Box'
import EnergyIcon from '~/public/icons/energy.svg'
import { BoxProps } from '~/types/boxes'
import { useRouter } from 'next/router'
import EnergyAC from '~/components/boxes/EnergyAC'
import Grid from '~/components/ui/Grid'
import EnergyDC from '~/components/boxes/EnergyDC/EnergyDC'
import EnergySolar from '~/components/boxes/EnergySolar/EnergySolar'
import EnergyShore from '~/components/boxes/EnergyShore/EnergyShore'
import { RouterPath } from '~/types/routes'
import EnergyLoads from '~/components/boxes/EnergyOverview/EnergyLoads'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()

  if (mode === 'compact') {
    return (
      <Box
        title={'Energy'}
        icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/EnergyOverview`)}
      >
        <Grid>
          <EnergyLoads />
        </Grid>
      </Box>
    )
  }

  return (
    <Grid>
      <EnergyShore mode={'full'} />
      <EnergyAC mode={'full'} />
      <EnergySolar mode={'full'} />
      <EnergyDC mode={'full'} />
    </Grid>
  )
}

export default EnergyOverview
