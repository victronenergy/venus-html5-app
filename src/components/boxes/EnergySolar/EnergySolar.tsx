import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'

const EnergySolar = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box title={'Solar Yield'}>
        <>
          <div>Solar Yield compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Solar Yield'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>Solar Yield full content</div>
      </>
    </Box>
  )
}

export default EnergySolar
