import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'

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

const ComponentWithErrorBoundary = withErrorBoundary(EnergyDC, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
