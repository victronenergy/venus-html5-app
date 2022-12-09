import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/type/boxes'
import EnergyIcon from '~/public/icons/energy.svg'

const EnergyDC = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box title={'DC Loads'}>
        <>
          <div>DC Loads compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'DC Loads'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>DC Loads full content</div>
      </>
    </Box>
  )
}

export default EnergyDC
