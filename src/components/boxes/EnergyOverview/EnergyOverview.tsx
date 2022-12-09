import React from 'react'
import Box from '@components/ui/Box'
import EnergyIcon from '@public/icons/energy.svg'
import { BoxProps } from '@type/boxes'
import { useRouter } from 'next/router'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()

  if (mode === 'compact') {
    return (
      <Box
        title={'Energy'}
        icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
        onClick={() => router.push('/box/EnergyOverview')}
      >
        <>
          <div>Compact energy content</div>
        </>
      </Box>
    )
  }

  return (
    <div>
      <div>Full energy content</div>
    </div>
  )
}

export default EnergyOverview
