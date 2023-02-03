import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'

const EnergyAC = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box title={'AC Loads'}>
        <>
          <div>AC Loads compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'AC Loads'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>AC Loads full content</div>
      </>
    </Box>
  )
}

const ComponentWithErrorBoundary = withErrorBoundary(EnergyAC, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
