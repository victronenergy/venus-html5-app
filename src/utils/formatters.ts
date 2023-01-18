import { BATTERY } from '~/utils/constants'

export const batteryStateFormatter = function (state: number) {
  switch (state) {
    case BATTERY.CHARGING: return 'charging'
    case BATTERY.IDLE: return 'idle'
    case BATTERY.DISCHARGING: return 'discharging'
  }
  return null;
}