import {
  BatteryId,
  PortalId,
  Topics,
  useBatteries,
  useMqtt,
  useTopicsState,
  useTopicSubscriptions,
} from "@victronenergy/mfd-modules"
import { useMemo } from "react"

export interface BatteryAlarmsState {
  lowVoltage: number
  highVoltage: number
  lowStarterVoltage: number
  highStarterVoltage: number
  lowSoc: number
  highChargeCurrent: number
  highDischargeCurrent: number
  cellImbalance: number
  internalFailure: number
  highChargeTemperature: number
  lowChargeTemperature: number
  lowCellVoltage: number
  lowTemperature: number
  highTemperature: number
  midVoltage: number
}

export interface BatteryAlarmsTopics extends Topics {
  lowVoltage?: string
  highVoltage?: string
  lowStarterVoltage?: string
  highStarterVoltage?: string
  lowSoc?: string
  highChargeCurrent?: string
  highDischargeCurrent?: string
  cellImbalance?: string
  internalFailure?: string
  highChargeTemperature?: string
  lowChargeTemperature?: string
  lowCellVoltage?: string
  lowTemperature?: string
  highTemperature?: string
  midVoltage?: string
}

export function useBatteryAlarms(): BatteryAlarmsState {
  const getTopics = (portalId: PortalId, batteries?: BatteryId[]) => {
    const batteryInstance = batteries ? batteries[0] : undefined

    return {
      lowVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/LowVoltage`,
      highVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/HighVoltage`,
      lowStarterVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/LowStarterVoltage`,
      highStarterVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/HighStarterVoltage`,
      lowSoc: `N/${portalId}/battery/${batteryInstance}/Alarms/LowSoc`,
      highChargeCurrent: `N/${portalId}/battery/${batteryInstance}/Alarms/HighChargeCurrent`,
      highDischargeCurrent: `N/${portalId}/battery/${batteryInstance}/Alarms/HighDischargeCurrent`,
      cellImbalance: `N/${portalId}/battery/${batteryInstance}/Alarms/CellImbalance`,
      internalFailure: `N/${portalId}/battery/${batteryInstance}/Alarms/InternalFailure`,
      highChargeTemperature: `N/${portalId}/battery/${batteryInstance}/Alarms/HighChargeTemperature`,
      lowChargeTemperature: `N/${portalId}/battery/${batteryInstance}/Alarms/LowChargeTemperature`,
      lowCellVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/LowCellVoltage`,
      lowTemperature: `N/${portalId}/battery/${batteryInstance}/Alarms/LowTemperature`,
      highTemperature: `N/${portalId}/battery/${batteryInstance}/Alarms/HighTemperature`,
      midVoltage: `N/${portalId}/battery/${batteryInstance}/Alarms/MidVoltage`,
    }
  }
  const { batteries } = useBatteries()

  const { portalId } = useMqtt()
  const topics = useMemo(() => getTopics(portalId, batteries), [portalId, batteries])

  useTopicSubscriptions(topics)

  return useTopicsState<BatteryAlarmsState>(topics)
}
