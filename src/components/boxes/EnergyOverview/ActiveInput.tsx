import { useActiveInValues, useActiveSource } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import { AC_SOURCE, ACTIVE_INPUT } from '~/utils/constants'

const ActiveInput = () => {
  const { activeInput, phases, settings } = useActiveSource()
  const { current } = useActiveInValues()
  const inputType = getInputType(activeInput, settings)
  const unplugged = inputType === null || !activeInput
    || activeInput === ACTIVE_INPUT.NONE
  const parsedCurrent = current.reduce((sum, val) => val ? sum + val : sum);

  return <>
    { inputType && <>
      <p>
        { inputType === AC_SOURCE.SHORE ? 'Shore Current: ' : 'Grid Current: '}
        { !unplugged && parsedCurrent ? parsedCurrent + 'A' : '--A'}
      </p>
      { unplugged && <small>Unplugged</small> }
      { !unplugged && phases !== 1 && <small>{phases}-phase input</small> }
    </>}
  </>
}

/*
  Returns the type of the active input, if none shore, if that is not found
  then grid, and otherwise null.
 */
const getInputType = function (activeInput: number, settings: number[]) {
  if (activeInput && activeInput !== ACTIVE_INPUT.NONE) {
    return settings[activeInput]
  }
  return settings.find(input => input === AC_SOURCE.SHORE) ??
    settings.find(input => input === AC_SOURCE.GRID) ?? null
}

export default observer(ActiveInput)