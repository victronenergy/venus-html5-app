import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import BatteriesIcon from '~/public/icons/batteries.svg'
import { RouterPath } from '~/types/routes'
import { useRouter } from 'next/router'

const BatteriesOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()

  if (mode === 'compact') {
    return (
      <Box
        title={'Batteries'}
        icon={<BatteriesIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/BatteriesOverview`)}
      >
        <>
          <div>Batteries compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Batteries'} icon={<BatteriesIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>Batteries full content</div>
      </>
    </Box>
  )
}

export default BatteriesOverview
