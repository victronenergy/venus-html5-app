import React, { useEffect, useRef } from 'react'
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
import Grid from '~/components/ui/Grid'
import { useComponentSize, useWindowSize } from '~/utils/hooks'

const TanksOverview = ({ mode = 'compact' }: BoxProps) => {
  const { tanks } = useTanks()
  const gridRef = useRef<HTMLDivElement>(null)
  const [orientation, setOrientation] = React.useState<'horizontal' | 'vertical'>('vertical')

  const componentSize = useComponentSize(gridRef)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (!windowSize || !componentSize) return
    if (windowSize.height !== undefined && 2 * componentSize.height > windowSize.height) {
      setOrientation('horizontal')
    } else {
      setOrientation('vertical')
    }
  }, [windowSize, componentSize])

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

  if (orientation == "vertical") {
  return (
      <Box title={'Tanks'} icon={<TanksIcon className={'w-6 text-black dark:text-white'} />}>
              <div ref={gridRef}>
                {tanks &&
                tanks.map((tank, index) => {
                  return tank ? <Tank key={index} tankInstanceId={tank} mode='full' orientation={orientation}/> : <></>
                })}
              </div>
      </Box>
    )
  } else {
    return (
      <Box title={'Tanks'} icon={<TanksIcon className={'w-6 text-black dark:text-white'} />}>
        <div className='grid grid-cols-4 h-full'>
              {tanks &&
                tanks.map((tank, index) => {
                  return tank ? <Tank key={index} tankInstanceId={tank} mode='full' orientation={orientation}/> : <></>
                })}
        </div>
      </Box>
    )
  }
  
}

const ComponentWithErrorBoundary = withErrorBoundary(TanksOverview, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

export default ComponentWithErrorBoundary
