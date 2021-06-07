import { mqttQuery, PortalId, Topics } from "@elninotech/mfd-modules"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "@elninotech/mfd-modules"

export interface InverterAlarmsState {
  lowVoltage: number
  highVoltage: number
  lowTemperature: number
  highTemperature: number
  overload: number
  ripple: number
  lowVoltageAcOut: number
  highVoltageAcOut: number
}

export interface InverterAlarmsTopics extends Topics {
  lowVoltage?: string
  highVoltage?: string
  lowTemperature?: string
  highTemperature?: string
  overload?: string
  ripple?: string
  lowVoltageAcOut?: string
  highVoltageAcOut?: string
}

export function useInverterAlarms(): InverterAlarmsState {
  const getTopics = (portalId: PortalId) => ({
    lowVoltage: `N/${portalId}/inverter/Alarms/LowVoltage`,
    highVoltage: `N/${portalId}/inverter/Alarms/HighVoltage`,
    lowTemperature: `N/${portalId}/inverter/Alarms/LowTemperature`,
    highTemperature: `N/${portalId}/inverter/Alarms/HighTemperature`,
    overload: `N/${portalId}/inverter/Alarms/Overload`,
    ripple: `N/${portalId}/inverter/Alarms/Ripple`,
    lowVoltageAcOut: `N/${portalId}/inverter/Alarms/LowVoltageAcOut`,
    highVoltageAcOut: `N/${portalId}/inverter/Alarms/HighVoltageAcOut`,
  })

  const topics$ = useTopicsWithPortalId<InverterAlarmsTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return useTopicsState<InverterAlarmsState>(topics$)
}
