import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { AcLoadsState } from '@elninotech/mfd-modules'

const EnergyAC = ({ mode = 'compact', acLoads }: Props) => {
  const { current, power, phases, voltage } = acLoads

  if (mode === 'compact') {
    return <p>AC: {current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}</p>
  }

  return <Box title={'AC Loads'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      <>
        <p>{current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}</p>
        <p>{power.slice(0, phases ?? 1).map(p => p ? p + 'W ' : '--W ')}</p>
        <p>{voltage.slice(0, phases ?? 1).map(v => v ? v + 'V ' : '--V ')}</p>
      </>
    </>
  </Box>
}

interface Props extends BoxProps {
  acLoads: AcLoadsState
}

export default EnergyAC
