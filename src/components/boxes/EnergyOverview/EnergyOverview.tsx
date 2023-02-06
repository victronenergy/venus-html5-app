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
  AlternatorId,
  DcLoadsState,
  PvChargerState,
  useAcLoads,
  useAlternators,
  useDcLoads,
  usePvCharger,
  useShorePowerInput,
  useVebus,
  useWindGenerators,
  WindGeneratorId,
} from '@elninotech/mfd-modules'
import EnergyShore from '~/components/boxes/EnergyShore'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'next-i18next'
import EnergyWind from '~/components/boxes/EnergyWind'
import EnergyAlternator from '~/components/boxes/EnergyAlternator'
import { t } from 'i18next'

const EnergyOverview = ({ mode = 'compact' }: BoxProps) => {
  const router = useRouter()
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const { inputId: shoreInputId } = useShorePowerInput()
  const acLoads = useAcLoads()
  const dcLoads = useDcLoads()
  const pvCharger = usePvCharger()
  const { alternators } = useAlternators()
  const { windGenerators } = useWindGenerators()
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <Box
        title={t('boxes.energy')}
        icon={<EnergyIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        onExpandHref={`${RouterPath.BOX}/EnergyOverview`}
      >
        <>{getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads, alternators, windGenerators)}</>
      </Box>
    )
  }

  return (
    <Grid className={'gap-2'}>
      {getAvailableEnergyBoxes(mode, shoreInputId, acLoads, pvCharger, dcLoads, alternators, windGenerators)}
    </Grid>
  )
}

const getAvailableEnergyBoxes = function (
  mode: 'compact' | 'full' | undefined,
  shoreInputId: number | null | undefined,
  acLoads: AcLoadsState,
  pvCharger: PvChargerState,
  dcLoads: DcLoadsState,
  alternators: AlternatorId[],
  windGenerators: WindGeneratorId[]
) {
  const boxes = []

  if (shoreInputId) {
    boxes.push(<EnergyShore mode={mode} inputId={shoreInputId} />)
  }

  // Add a divider if there are any AC loads or DC loads in the compact mode
  if (
    mode === 'compact' &&
    (acLoads.phases || ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0)))
  ) {
    boxes.push(
      <div className='flex flex-row justify-between'>
        <p className='text-sm md:text-base text-victron-gray2 dark:text-victron-gray2-dark'>
          {t('common.loads') ? t('common.loads') : 'Loads'}
        </p>
        <div className='w-full ml-2 mb-2 border-b border-victron-gray2 dark:border-victron-gray2-dark' />
      </div>
    )
  }

  if (acLoads.phases) boxes.push(<EnergyAC mode={mode} acLoads={acLoads} />)

  if ((dcLoads.current || dcLoads.current === 0) && (dcLoads.voltage || dcLoads.voltage === 0)) {
    boxes.push(<EnergyDC mode={mode} dcLoads={dcLoads} />)
  }

  if ((pvCharger.current || pvCharger.current === 0) && (pvCharger.power || pvCharger.power === 0)) {
    boxes.push(<EnergySolar mode={mode} pvCharger={pvCharger} />)
  }

  const alternatorsPresent = alternators.filter((v) => v || v === 0)
  if (alternatorsPresent && alternatorsPresent.length > 0) {
    boxes.push(
      ...alternatorsPresent.map((alternator) => (
        <EnergyAlternator
          key={`alternator_${alternator}`}
          mode={mode}
          alternator={alternator ?? 0}
          showInstance={alternators.length > 1}
        />
      ))
    )
  }

  const windGeneratorsPresent = windGenerators.filter((v) => v || v === 0)
  if (windGeneratorsPresent && windGeneratorsPresent.length > 0) {
    boxes.push(
      ...windGeneratorsPresent.map((windGenerator) => (
        <EnergyWind
          key={`wind_${windGenerator}`}
          mode={mode}
          windGenerator={windGenerator ?? 0}
          showInstance={alternators.length > 1}
        />
      ))
    )
  }

  return boxes
}

export default observer(EnergyOverview)
