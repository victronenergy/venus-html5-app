import React from 'react'
import Box from '~/components/ui/Box'
import EnergyIcon from '~/public/icons/energy.svg'
import { RouterPath } from '~/types/routes'
import { useRouter } from 'next/router'
import { BoxProps } from '~/types/boxes'
import { useTanks } from '@elninotech/mfd-modules'
import Tank from '~/components/boxes/Tanks/Tank'
import { observer } from 'mobx-react-lite'

const Tanks = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const { tanks } = useTanks()

  return (
    <Box
      title={'Tanks'}
      icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
      onExpandClick={mode === 'compact' ? () => router.push(`${RouterPath.BOX}/Tanks`) : undefined}
    >
      <>
        <div>Tanks</div>
        <div>
          {
            tanks && tanks.map((tank, index) => {
              return tank ? (<Tank key={index} tankInstanceId={tank} />) : null
            })
          }
        </div>
      </>
    </Box>
  )
}

export default observer(Tanks)
