import React from 'react'
import { ActiveSourceState, useActiveInValues } from '@elninotech/mfd-modules'
import { AC_SOURCE, ACTIVE_INPUT } from '~/utils/constants'
import { observer } from 'mobx-react-lite'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import Box from '~/components/ui/Box'

const EnergyActiveInput = ({ mode = 'compact', inputType, source }: Props) => {
  const { activeInput, phases } = source
  const { current, power } = useActiveInValues()
  const unplugged = (!activeInput && activeInput !== 0)
    || activeInput === ACTIVE_INPUT.NONE
  const summedCurrent = current.reduce((sum, val) => val ? sum + val : sum)
  const title = inputType === AC_SOURCE.SHORE ? 'Shore' : 'Grid'

  if (mode === 'compact') {
    return <>
      <p>
        { title + ': ' }
        { !unplugged && summedCurrent ? summedCurrent + 'A' : '--A'}
      </p>
      { unplugged && <small>Unplugged</small> }
      { !unplugged && phases !== 1 && <small>{phases}-phase input</small> }
    </>
  }

  return <Box title={title} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      { unplugged && <p>Unplugged</p> }
      { !unplugged && phases === 1 &&
        <>
          <p>{current[0] ? current[0] + 'A' : '--A'}</p>
          <p>{power[0] ? power[0] + 'W' : '--W'}</p>
        </>
      }
      { !unplugged && phases > 1 &&
        <>
          <p>{current.map(c => c ? c + 'A ' : '')}</p>
          <p>{power.map(p => p ? p + 'W ' : '')}</p>
        </>
      }
    </>
  </Box>
}

interface Props extends BoxProps {
  inputType?: number
  source: ActiveSourceState
}

export default observer(EnergyActiveInput)
