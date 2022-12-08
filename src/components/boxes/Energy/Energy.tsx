import React from 'react'
import Box from '@components/ui/Box'
import EnergyIcon from '@public/icons/energy.svg'
import { BoxProps } from '@type/boxes'

const Energy = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box title={'Energy'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
        Energy content
      </Box>
    )
  }

  return <div>Full energy</div>
}

export default Energy
