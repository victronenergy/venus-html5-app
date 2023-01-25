import { TFunction } from 'i18next'
import { BATTERY } from '~/utils/constants'

export const batteryStateFormatter = function(t: TFunction, state: number) {
  switch (state) {
    case BATTERY.CHARGING: return t('common.charging')
    case BATTERY.IDLE: return t('common.idle')
    case BATTERY.DISCHARGING: return t('common.discharging')
  }
  return null;
}