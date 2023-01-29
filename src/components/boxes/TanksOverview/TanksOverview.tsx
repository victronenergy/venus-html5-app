import React, { useEffect } from 'react'
import Box from '~/components/ui/Box'
import TanksIcon from '~/public/icons/tanks.svg'
import { RouterPath } from '~/types/routes'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ui/ErrorBoundary/ErrorFallback'
import { useRouter } from 'next/router'
import { BoxProps } from '~/types/boxes'
import { useTanks } from '@elninotech/mfd-modules'
import Tank from '~/components/boxes/Tanks/Tank'
import { observer } from 'mobx-react-lite'

const TanksOverview = ({ mode = 'compact' }: BoxProps) => {
  const { tanks } = useTanks()

  if (mode === 'compact') {
    return (
      <Box
        title={'Tanks'}
        icon={<TanksIcon className={'w-6 text-black dark:text-white'} />}
        onExpandHref={`${RouterPath.BOX}/TanksOverview/`}
      >
        <>
          <div>Tanks</div>
          <div>
            {tanks &&
              tanks.map((tank, index) => {
                return tank ? <Tank key={index} tankInstanceId={tank} /> : null
              })}
          </div>
        </>
      </Box>
    )
  }

  return (
    <Box title={'Tanks'} icon={<TanksIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        {tanks &&
        tanks.map((tank, index) => {
          return tank ? <Tank key={index} tankInstanceId={tank} mode='full' /> : null
        })}
      </>
    </Box>
  )
}

const ComponentWithErrorBoundary = withErrorBoundary(TanksOverview, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
