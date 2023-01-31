import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import DevicesIcon from '~/public/icons/devices.svg'
import { RouterPath } from '~/types/routes'

const DevicesOverview = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box
        title={'Devices'}
        icon={<DevicesIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandHref={`${RouterPath.BOX}/DevicesOverview`}
      >
        <>
          <div>Devices compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Devices'} icon={<DevicesIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>Devices full content</div>
      </>
    </Box>
  )
}

export default DevicesOverview
