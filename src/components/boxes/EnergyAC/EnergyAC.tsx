import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { AcLoadsState } from '@elninotech/mfd-modules'

const EnergyAC = ({ mode = 'compact', acLoads }: Props) => {
  const { current, power, phases, voltage } = acLoads
  const summedCurrent = current.reduce((sum, val) => val ? sum + val : sum);

  if (mode === 'compact') {
    return <p>AC: { (summedCurrent ?? '--') + 'A' }</p>
  }

  return <Box title={'AC Loads'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      { phases === 1 &&
        <>
          <p>{current[0] ? current[0] + 'A' : '--A'}</p>
          <p>{power[0] ? power[0] + 'W' : '--W'}</p>
          <p>{voltage[0] ? voltage[0] + 'V' : '--V'}</p>
        </>
      }
      { phases > 1 &&
        <>
          <p>{current.map(c => c ? c + 'A ' : '--A ')}</p>
          <p>{power.map(p => p ? p + 'W ' : '--W ')}</p>
          <p>{voltage.map(v => v ? v + 'V ' : '--V ')}</p>
        </>
      }
    </>
  </Box>
}

interface Props extends BoxProps {
  acLoads: AcLoadsState
}

export default EnergyAC
