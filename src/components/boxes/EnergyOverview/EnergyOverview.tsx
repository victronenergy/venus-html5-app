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
import ActiveInput from '~/components/boxes/EnergyOverview/ActiveInput'
import Solar from '~/components/boxes/EnergyOverview/Solar'
import AcLoads from '~/components/boxes/EnergyOverview/AcLoads'
import DcLoads from '~/components/boxes/EnergyOverview/DcLoads'
import { useVebus } from '@elninotech/mfd-modules'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions

  if (mode === 'compact') {
    return (
      <Box
        title={'Energy'}
        icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/EnergyOverview`)}
      >
        <>
          <ActiveInput />
          <Solar />
          <AcLoads />
          <DcLoads />
        </>
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
