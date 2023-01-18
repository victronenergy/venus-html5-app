import React from 'react'
import { ActiveSourceState, useActiveInValues } from '@elninotech/mfd-modules'
import { AC_SOURCE, ACTIVE_INPUT } from '~/utils/constants'
import { observer } from 'mobx-react-lite'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import Box from '~/components/ui/Box'

const EnergyActiveInput = ({ mode = 'compact', inputType, source }: Props) => {
  const { activeInput, phases } = source
  const { current, power, voltage } = useActiveInValues()
  const unplugged = (!activeInput && activeInput !== 0)
    || activeInput === ACTIVE_INPUT.NONE
  const title = inputType === AC_SOURCE.SHORE ? 'Shore' : 'Grid'

  if (mode === 'compact') {
    return <>
      <p>
        { title + ': ' }
        { current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}
      </p>
      { unplugged && <small>Unplugged</small> }
      { !unplugged && phases !== 1 && <small>{phases}-phase input</small> }
    </>
  }

  return <Box title={title} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      { unplugged && <p>Unplugged</p> }
      { !unplugged &&
        <>
          <p>{current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}</p>
          <p>{power.slice(0, phases ?? 1).map(p => p ? p + 'W ' : '--W ')}</p>
          <p>{voltage.slice(0, phases ?? 1).map(v => v ? v + 'V ' : '--V ')}</p>
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
