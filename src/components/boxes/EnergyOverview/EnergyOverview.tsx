import React from 'react'
import Box from '~/components/ui/Box'
import EnergyIcon from '~/public/icons/energy.svg'
import { BoxProps } from '~/types/boxes'
import { useRouter } from 'next/router'
import EnergyAC from '~/components/boxes/EnergyAC'
import Grid from '~/components/ui/Grid'
import EnergyDC from '~/components/boxes/EnergyDC/EnergyDC'
import EnergySolar from '~/components/boxes/EnergySolar/EnergySolar'
import { RouterPath } from '~/types/routes'
import {
  AcLoadsState,
  ActiveSourceState,
  DcLoadsState, PvChargerState,
  useAcLoads,
  useActiveSource,
  useDcLoads,
  usePvCharger,
  useVebus
} from '@elninotech/mfd-modules'
import EnergyActiveInput from '~/components/boxes/EnergyActiveInput'
import { observer } from 'mobx-react-lite'
import { AC_SOURCE, ACTIVE_INPUT } from '~/utils/constants'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const activeSource = useActiveSource()
  const acLoads = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()

  if (mode === 'compact') {
    return (
      <Box
        title={'Energy'}
        icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/EnergyOverview`)}
      >
        <>{
          getAvailableEnergyBoxes(mode, activeSource, acLoads, pvCharger, dcLoads)
        }</>
      </Box>
    )
  }

  return (
    <Grid>{
      getAvailableEnergyBoxes(mode, activeSource, acLoads, pvCharger, dcLoads)
    }</Grid>
  )
}

const getAvailableEnergyBoxes = function (
  mode: 'compact' | 'full' | undefined,
  activeSource: ActiveSourceState,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState
) {
  const boxes = [];

  const activeInputType = getInputType(activeSource.activeInput, activeSource.settings)
  if (activeInputType !== null) {
    boxes.push(<EnergyActiveInput mode={mode} inputType={activeInputType} source={activeSource}/>)
  }

  if ((pvCharger.current || pvCharger.current === 0) &&
    (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(<EnergySolar mode={mode} pvCharger={pvCharger} />)
  }

  if (acLoads.phases) boxes.push(<EnergyAC mode={mode} acLoads={acLoads} />)

  if ((dcLoads.current || dcLoads.current === 0) &&
    (dcLoads.voltage || dcLoads.voltage === 0)) {
    boxes.push(<EnergyDC mode={mode} dcLoads={dcLoads} />)
  }

  return boxes;
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

export default observer(EnergyOverview)
