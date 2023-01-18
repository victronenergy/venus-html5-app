import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { PvChargerState } from '@elninotech/mfd-modules'

const EnergySolar = ({ mode = 'compact', pvCharger }: Props) => {
  const { current, power } = pvCharger

  if (mode === 'compact') {
    return <p>Solar Yield: { Math.round(current) }A</p>
  }

  return (
    <Box title={'Solar Yield'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
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
