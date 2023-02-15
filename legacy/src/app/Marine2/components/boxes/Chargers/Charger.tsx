import { ChargerInstanceId, useCharger } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import InverterChargerIcon from '~/public/icons/inverter-charger.svg'
import { CHARGER_MODE } from '~/utils/constants'
import { useTranslation } from 'react-i18next'
import { stateFormatter } from '~/utils/formatters'

const Charger = ({ instanceId, componentMode = 'compact' }: Props) => {
  const chargerModeFormatter = (value: number) => {
    switch (value) {
      case CHARGER_MODE.OFF:
        return t('common.off')
      case CHARGER_MODE.ON:
        return t('common.on')
      default:
        return t('common.emptyBar')
    }
  }

  const { t } = useTranslation()

  let {
    customName,
    nrOfOutputs = 3,
    productName,
    current,
    state,
    mode,
    currentLimit,
    updateMode,
    updateCurrentLimit,
  } = useCharger(instanceId)
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const chargerSupportsMode = mode !== undefined
  const chargerSupportsInputLimit = currentLimit !== undefined
  const chargerMode = chargerModeFormatter(Number(mode))

  const productNameShort = productName && productName.split(' ')[0]

  if (componentMode === 'compact') {
    return (
      <div className={'flex flex-row items-center justify-between w-full'}>
        <div className={'flex flex-row items-center justify-start'}>
          <div className={'w-11'}>
            <InverterChargerIcon className={'w-7'}></InverterChargerIcon>
          </div>
          <div className={'col-span-7 flex flex-col'}>
            <div className={'text-base md:text-lg lg:text-xl leading-none md:leading-none lg:leading-none pb-1'}>
              {productNameShort}
            </div>
            <div
              className={
                'dark:text-victron-gray-dark text-xs md:text-sm lg:text-sm leading-none md:leading-none lg:leading-none '
              }
            >
              {state && t(stateFormatter(Number(state)))}
            </div>
          </div>
        </div>
        <div className={'col-span-2 justify-self-end text-3xl flex flex-row pr-2'}>
          <div>{current && current[0] && current[0].toFixed(1.0)}</div>
          <div className={'text-victron-gray/70 pl-1'}>{' A'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={'flex flex-row items-center justify-between w-full'}>
      <div className={'flex flex-row items-center justify-start'}>
        <div className={'w-11'}>
          <InverterChargerIcon className={'w-7'}></InverterChargerIcon>
        </div>
        <div className={'col-span-7 flex flex-col'}>
          <div className={'text-base md:text-lg lg:text-xl leading-none md:leading-none lg:leading-none pb-1'}>
            {productName && productName.split(' ')[0]}
          </div>
          <div
            className={
              'dark:text-victron-gray-dark text-xs md:text-sm lg:text-sm leading-none md:leading-none lg:leading-none '
            }
          >
            {state && stateFormatter(Number(state))}
          </div>
        </div>
      </div>
      <div className={'col-span-2 justify-self-end text-3xl flex flex-row pr-2'}>
        <div>{current && current[0] && current[0].toFixed(1.0)}</div>
        <div className={'text-victron-gray/70 pl-1'}>{' A'}</div>
      </div>
    </div>
  )
}

interface Props {
  instanceId: ChargerInstanceId
  componentMode?: 'compact' | 'full'
}

export default observer(Charger)
