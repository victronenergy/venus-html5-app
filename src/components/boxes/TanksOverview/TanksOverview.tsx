import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import LevelsIcon from '~/public/icons/levels.svg'
import { RouterPath } from '~/types/routes'

const TanksOverview = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box
        title={'Tanks'}
        icon={<LevelsIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandHref={`${RouterPath.BOX}/TanksOverview`}
      >
        <>
          <div>Tanks compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Tanks'} icon={<LevelsIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>Tanks full content</div>
      </>
    </Box>
  )
}

export default TanksOverview
