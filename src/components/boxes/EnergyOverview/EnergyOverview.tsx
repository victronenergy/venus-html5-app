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
  DcLoadsState, PvChargerState,
  useAcLoads,
  useDcLoads,
  usePvCharger, useShorePowerInput,
  useVebus
} from '@elninotech/mfd-modules'
import EnergyShore from '~/components/boxes/EnergyShore'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'next-i18next'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const { inputId: shoreInputId } = useShorePowerInput()
  const acLoads = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { t } = useTranslation()
  if (mode === 'compact') {
    return (
      <Box
        title={t('boxes.energy')}
        icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}
        onExpandClick={() => router.push(`${RouterPath.BOX}/EnergyOverview`)}
      >
        <>{
          getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads)
        }</>
      </Box>
    )
  }

  return (
    <Grid>{
      getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads)
    }</Grid>
  )
}

const getAvailableEnergyBoxes = function (
  mode: 'compact' | 'full' | undefined,
  shoreInputId: number | null | undefined,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState
) {
  const boxes = [];

  if (shoreInputId) {
    boxes.push(<EnergyShore mode={mode} inputId={shoreInputId} />)
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

export default observer(EnergyOverview)
