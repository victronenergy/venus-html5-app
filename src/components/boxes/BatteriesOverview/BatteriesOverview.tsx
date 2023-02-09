import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import BatteriesIcon from '~/public/icons/batteries.svg'
import { RouterPath } from '~/types/routes'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'

const BatteriesOverview = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box
        title={'Batteries'}
        icon={<BatteriesIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandHref={`${RouterPath.BOX}/BatteriesOverview`}
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

const ComponentWithErrorBoundary = withErrorBoundary(BatteriesOverview, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
