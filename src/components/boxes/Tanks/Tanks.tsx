import React from 'react'
import Box from '~/components/ui/Box'
import TanksIcon from '~/public/icons/tanks.svg'
import { RouterPath } from '~/types/routes'
import { useRouter } from 'next/router'
import { BoxProps } from '~/types/boxes'
import { useTanks } from '@elninotech/mfd-modules'
import Tank from '~/components/boxes/Tanks/Tank'
import { observer } from 'mobx-react-lite'

const Tanks = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const { tanks } = useTanks()

  if (mode === 'compact') {
    return (
      <Box
        title={'Tanks'}
        icon={<TanksIcon className={'w-6 text-black dark:text-white'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/Tanks`)}
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
    <>
      {tanks &&
        tanks.map((tank, index) => {
          return tank ? <Tank key={index} tankInstanceId={tank} mode='full' /> : null
        })}
    </>
  )
}

export default observer(Tanks)
