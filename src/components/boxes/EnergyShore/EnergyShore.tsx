import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'

const EnergyShore = ({ mode = 'compact' }: BoxProps) => {
  if (mode === 'compact') {
    return (
      <Box title={'Shore power'}>
        <>
          <div>Shore power compact</div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Shore power'} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        <div>Shore power full content</div>
      </>
    </Box>
  )
}

const ComponentWithErrorBoundary = withErrorBoundary(EnergyShore, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
