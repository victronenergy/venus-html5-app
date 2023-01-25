import { TFunction } from 'i18next'
import { BATTERY } from '~/utils/constants'

export const batteryStateNameFormatter = function(t: TFunction, state: number): string | null {
  switch (state) {
    case BATTERY.CHARGING: return t('common.charging')
    case BATTERY.IDLE: return t('common.idle')
    case BATTERY.DISCHARGING: return t('common.discharging')
  }
  return null
}
