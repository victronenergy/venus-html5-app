import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId } from "@victronenergy/mfd-modules"
import { SwitchableOutputType, SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import MomentaryOutput from "./MomentaryOutput"
import { observer } from "mobx-react"
import ToggleOutput from "./ToggleOutput"
import DimmableOutput from "./DimmableOutput"
import TemperatureSetpointOutput from "./TemperatureSetpointOutput"
import SteppedSwitchOutput from "./SteppedSwitchOutput"
import DropdownOutput from "./DropdownOutput"
import UnrangedSetpointOutput from "./UnrangedSetpointOutput"
import ThreeStateSwitchOutput from "./ThreeStateSwitchOutput"
import BilgePumpControlOutput from "./BilgePumpControlOutput"
import SliderOutput from "./SliderOutput"
import DimmableHSVWOutput from "./DimmableHSVWOutput"

interface SwitchableOutputProps {
  key: string
  type: SwitchableOutputType
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  parentDeviceName: string
  className?: string
}

const SwitchableOutput = observer((props: SwitchableOutputProps) => {
  const key = `${props.deviceId}_${props.outputId}`
  switch (props.type) {
    case SWITCHABLE_OUTPUT_TYPE.MOMENTARY_SWITCH:
      return (
        <MomentaryOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.TOGGLE_SWITCH:
      return (
        <ToggleOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.DIMMABLE:
      return (
        <DimmableOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.TEMPERATURE_SETPOINT:
      return (
        <TemperatureSetpointOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.STEPPED_SWITCH:
      return (
        <SteppedSwitchOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.DROPDOWN:
      return (
        <DropdownOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.SLIDER:
      return (
        <SliderOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.UNRANGED_SETPOINT:
      return (
        <UnrangedSetpointOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.THREE_STATE_SWITCH:
      return (
        <ThreeStateSwitchOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.BILGE_PUMP_CONTROL:
      return (
        <BilgePumpControlOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.RGB_COLOR_WHEEL:
      // TODO: specify RGB mode for DimmableHSVWOutput
      return (
        <DimmableHSVWOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.CCT_COLOR_WHEEL:
      // TODO: specify CCT mode for DimmableHSVWOutput
      return (
        <DimmableHSVWOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
    case SWITCHABLE_OUTPUT_TYPE.RGBW_COLOR_WHEEL:
      // TODO: specify RGBW mode for DimmableHSVWOutput
      return (
        <DimmableHSVWOutput
          key={key}
          deviceId={props.deviceId}
          outputId={props.outputId}
          parentDeviceName={props.parentDeviceName}
          className={props.className}
        />
      )
  }
})

export default SwitchableOutput
