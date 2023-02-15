import { InverterInstanceId, useInverter } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import InverterChargerIcon from '~/public/icons/inverter-charger.svg'
import { INVERTER_MODE } from '~/utils/constants'
import { useTranslation } from 'react-i18next'
import { stateFormatter } from '~/utils/formatters'

const Inverter = ({ instanceId, isVebusInverter, componentMode = 'compact' }: Props) => {
  const { t } = useTranslation()

  const source = isVebusInverter ? 'vebus' : 'inverter'
  let { state, mode, voltage, current, power, customName, productName, nAcInputs, updateMode } = useInverter(
    instanceId,
    source
  )

  // if nAcInputs === 0 it means it's an inverter, if not it's an inverter/charger => skip
  const show = !isVebusInverter || nAcInputs === 0
  // Vebus inverters use mode 3 instead of 2 for ON.
  const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

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
          <div>{current && current.toFixed(1.0)}</div>
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
            {state && t(stateFormatter(Number(state)))}
          </div>
        </div>
      </div>
      <div className={'col-span-2 justify-self-end text-3xl flex flex-row pr-2'}>
        <div>{current && current.toFixed(1.0)}</div>
        <div className={'text-victron-gray/70 pl-1'}>{' A'}</div>
      </div>
    </div>
  )
}

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  componentMode?: 'compact' | 'full'
}

export default observer(Inverter)
