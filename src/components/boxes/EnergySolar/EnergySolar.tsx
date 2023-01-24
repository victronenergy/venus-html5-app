import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'

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

const ComponentWithErrorBoundary = withErrorBoundary(EnergySolar, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
